import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
let serverProcess;
let baseUrl;
let processOutput = "";

async function findAvailablePort() {
  const probe = createServer();
  await new Promise((resolve, reject) => {
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", resolve);
  });
  const { port } = probe.address();
  await new Promise((resolve, reject) => probe.close((error) => error ? reject(error) : resolve()));
  return port;
}

before(async () => {
  const port = await findAvailablePort();
  baseUrl = `http://127.0.0.1:${port}`;

  serverProcess = spawn(process.execPath, ["server/server.cjs"], {
    cwd: projectRoot,
    env: {
      ...process.env,
      HOST: "127.0.0.1",
      PORT: String(port),
      GROQ_MODEL: "test-model",
      GROQ_API_KEY: "",
      FRONTEND_URL: "https://incredible-bharat.pages.dev",
      CORS_ORIGINS: ""
    },
    stdio: ["ignore", "pipe", "pipe"]
  });

  serverProcess.stdout.on("data", (chunk) => { processOutput += chunk.toString(); });
  serverProcess.stderr.on("data", (chunk) => { processOutput += chunk.toString(); });

  await new Promise((resolve, reject) => {
    serverProcess.once("spawn", resolve);
    serverProcess.once("error", reject);
  });

  const deadline = Date.now() + 8000;
  while (Date.now() < deadline) {
    if (serverProcess.exitCode !== null) {
      throw new Error(`API server exited before becoming ready. Output: ${processOutput}`);
    }
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return;
    } catch {
      // The server is still starting; retry briefly.
    }
    await delay(80);
  }
  throw new Error(`API server did not become ready. Output: ${processOutput}`);
});

after(async () => {
  if (!serverProcess || serverProcess.exitCode !== null || serverProcess.signalCode !== null) return;
  await new Promise((resolve) => {
    serverProcess.once("exit", resolve);
    serverProcess.kill("SIGTERM");
  });
});

test("health endpoint reports service status without exposing secrets", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.service, "Incredible Bharat AI Guide");
  assert.equal(body.aiConfigured, false);
  assert.equal(body.model, "test-model");
  assert.equal("apiKey" in body, false);
});

test("health endpoint allows the deployed frontend origin", async () => {
  const response = await fetch(`${baseUrl}/api/health`, {
    headers: { Origin: "https://incredible-bharat.pages.dev" }
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("access-control-allow-origin"), "https://incredible-bharat.pages.dev");
});

test("blank AI questions are rejected before provider calls", async () => {
  const response = await fetch(`${baseUrl}/api/ask-guide`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: "   " })
  });
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.success, false);
  assert.equal(body.error, "Please enter a question.");
});

test("AI endpoint returns a safe configuration error when the API key is absent", async () => {
  const response = await fetch(`${baseUrl}/api/ask-guide`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: "Tell me about Maharashtra's cultural heritage" })
  });
  const body = await response.json();

  assert.equal(response.status, 503);
  assert.equal(body.success, false);
  assert.match(body.error, /not configured/i);
});

test("oversized JSON request bodies are rejected", async () => {
  const response = await fetch(`${baseUrl}/api/ask-guide`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: "x".repeat(12000) })
  });
  const body = await response.json();

  assert.equal(response.status, 413);
  assert.equal(body.success, false);
  assert.equal(body.error, "The request is too large.");
});

test("compressed JSON bodies are rejected safely", async () => {
  const compressed = gzipSync(Buffer.from(JSON.stringify({ question: "hello" })));
  const response = await fetch(`${baseUrl}/api/ask-guide`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Encoding": "gzip"
    },
    body: compressed
  });
  const body = await response.json();

  assert.equal(response.status, 415);
  assert.equal(body.success, false);
  assert.equal(body.error, "Compressed request bodies are not supported.");
});

test("malformed JSON gets a safe client error", async () => {
  const response = await fetch(`${baseUrl}/api/ask-guide`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{bad json"
  });
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.success, false);
  assert.equal(body.error, "The request body must be valid JSON.");
});
