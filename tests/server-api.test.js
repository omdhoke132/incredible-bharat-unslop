import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import test from "node:test";

async function getAvailablePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("Could not allocate a local test port.");
  }
  const port = address.port;
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
  return port;
}

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

test("AI API starts and handles health, invalid input, CORS, and missing credentials", {
  timeout: 20000
}, async (t) => {
  const port = await getAvailablePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, ["server/server.cjs"], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PORT: String(port),
      HOST: "127.0.0.1",
      GEMINI_API_KEY: "",
      FRONTEND_URL: "http://localhost:5173",
      CORS_ORIGINS: "http://localhost:5173",
      RATE_LIMIT_PER_MINUTE: "20"
    },
    stdio: ["ignore", "pipe", "pipe"]
  });

  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
  child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });

  t.after(async () => {
    if (child.exitCode === null && !child.killed) child.kill("SIGTERM");
    if (child.exitCode === null) {
      await Promise.race([
        new Promise((resolve) => child.once("exit", resolve)),
        pause(1500)
      ]);
    }
  });

  async function waitForHealth() {
    const deadline = Date.now() + 12000;
    let lastError;
    while (Date.now() < deadline) {
      if (child.exitCode !== null) {
        throw new Error(
          "API exited before becoming healthy.\nstdout: " + stdout + "\nstderr: " + stderr
        );
      }
      try {
        const response = await fetch(baseUrl + "/api/health");
        if (response.ok) return response;
        lastError = new Error("Health request returned HTTP " + response.status);
      } catch (error) {
        lastError = error;
      }
      await pause(100);
    }
    throw new Error(
      "API did not become healthy in time: " + String(lastError) +
      "\nstdout: " + stdout + "\nstderr: " + stderr
    );
  }

  const healthResponse = await waitForHealth();
  const health = await healthResponse.json();
  assert.equal(health.success, true);
  assert.equal(health.aiConfigured, false);
  assert.ok(health.model);

  const allowedOriginResponse = await fetch(baseUrl + "/api/health", {
    headers: { Origin: "http://localhost:5173" }
  });
  assert.equal(
    allowedOriginResponse.headers.get("access-control-allow-origin"),
    "http://localhost:5173"
  );

  const blockedOriginResponse = await fetch(baseUrl + "/api/health", {
    headers: { Origin: "https://unapproved.example" }
  });
  assert.equal(blockedOriginResponse.headers.get("access-control-allow-origin"), null);

  const missingQuestion = await fetch(baseUrl + "/api/ask-guide", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
  assert.equal(missingQuestion.status, 400);
  assert.equal((await missingQuestion.json()).success, false);

  const oversizedQuestion = await fetch(baseUrl + "/api/ask-guide", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: "x".repeat(1001) })
  });
  assert.equal(oversizedQuestion.status, 400);

  const unconfiguredQuestion = await fetch(baseUrl + "/api/ask-guide", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: "Tell me about Indian festivals" })
  });
  assert.equal(unconfiguredQuestion.status, 503);
  assert.equal((await unconfiguredQuestion.json()).success, false);
});
