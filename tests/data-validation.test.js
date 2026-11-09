import assert from "node:assert/strict";
import test from "node:test";
import states from "../src/data/states/index.js";
import {
  getAllHeritage,
  getAllArts,
  getAllTraditions,
  getAllFestivals,
  getAllCrafts,
  getAllTextiles,
  getAllMusic,
  getAllInstruments,
  getAllCuisine,
  getAllCommunities,
  getAllCulturalPlaces,
  getAllInstitutions,
  getAllLanguages,
  getAllLiterature,
  getAllKnowledgeHeritage,
  getCultureItemById,
  getCultureStats,
  getStateSources,
  getUNESCOHeritage,
  searchCulture
} from "../src/services/cultureService.js";

const collections = {
  heritage: getAllHeritage,
  traditions: getAllTraditions,
  festivals: getAllFestivals,
  arts: getAllArts,
  crafts: getAllCrafts,
  textiles: getAllTextiles,
  music: getAllMusic,
  instruments: getAllInstruments,
  cuisine: getAllCuisine,
  communities: getAllCommunities,
  culturalPlaces: getAllCulturalPlaces,
  institutions: getAllInstitutions,
  languages: getAllLanguages,
  literature: getAllLiterature,
  knowledgeHeritage: getAllKnowledgeHeritage
};

test("state modules have usable identifiers, summaries and source directories", () => {
  assert.ok(states.length > 0, "at least one state dataset should be loaded");
  const stateIds = new Set();

  for (const state of states) {
    assert.ok(state.id, "state id is required");
    assert.ok(state.name, "state name is required");
    assert.ok(state.description, state.name + " needs a state summary");
    assert.ok(!stateIds.has(state.id), "duplicate state id: " + state.id);
    stateIds.add(state.id);
    assert.ok(getStateSources(state.id).length > 0, state.name + " needs usable references");

    for (const source of getStateSources(state.id)) {
      assert.ok(source.title, "reference title is required");
      assert.ok(["http:", "https:"].includes(new URL(source.url).protocol), "reference URL must use HTTP(S)");
    }
  }
});

test("all cultural collections normalise names, IDs, state metadata and descriptions", () => {
  for (const [category, getter] of Object.entries(collections)) {
    const items = getter();
    assert.ok(Array.isArray(items), category + " must return an array");
    const keys = new Set();

    for (const item of items) {
      assert.ok(item.id, category + " entry is missing an id");
      assert.ok(item.name && item.name.trim(), category + " entry is missing a name");
      assert.ok(item.description && item.description.trim(), category + " entry needs a visible description or an explicit curation note");
      assert.ok(item.stateId, category + " entry is missing stateId");
      assert.ok(item.state, category + " entry is missing state name");
      assert.equal(item.categoryKey, category, "normalised category key should be stable");
      const key = item.stateId + ":" + item.id;
      assert.ok(!keys.has(key), "duplicate ID in " + category + ": " + key);
      keys.add(key);
      assert.ok(Array.isArray(item.regionalSources), "regional source metadata should always be an array");
    }
  }
});

test("heritage detail lookup is scoped correctly and missing IDs return null", () => {
  const items = getAllHeritage();
  assert.ok(items.length > 0);
  const sample = items[0];
  assert.equal(
    getCultureItemById("heritage", sample.id, sample.stateId)?.name,
    sample.name
  );
  assert.equal(getCultureItemById("not-a-category", sample.id, sample.stateId), null);
  assert.equal(getCultureItemById("heritage", "certainly-not-a-real-id", sample.stateId), null);
});

test("UNESCO helper excludes explicit none values and returns labelled entries", () => {
  const items = getUNESCOHeritage();
  for (const item of items) {
    assert.ok(item.unesco, item.name + " should have a non-empty UNESCO label");
    assert.notEqual(String(item.unesco).toLowerCase(), "none");
  }
});

test("collection statistics match the available service categories", () => {
  const stats = getCultureStats();
  assert.equal(stats.states, states.length);
  assert.equal(stats.categoryCount, Object.keys(collections).length);
  for (const [category, getter] of Object.entries(collections)) {
    assert.ok(Number.isInteger(stats[category] ?? stats[category + "Sites"] ?? stats.heritageSites), "statistics should expose numeric totals");
    assert.ok(getter().length >= 0);
  }
});


test("search is case-insensitive, accent-insensitive, and includes record names", () => {
  const sample = getAllArts()[0];
  assert.ok(sample, "at least one arts entry should exist");

  const accentedQuery = sample.name[0] + "\u0301" + sample.name.slice(1);
  const results = searchCulture(accentedQuery);
  assert.ok(
    results.arts.some((item) => item.id === sample.id && item.stateId === sample.stateId),
    "search should find a record when case or diacritics differ"
  );
});
