import statesData from "../data/states/index.js";

const CATEGORY_KEYS = [
  "heritage", "traditions", "festivals", "arts", "crafts", "textiles",
  "music", "instruments", "cuisine", "communities", "culturalPlaces",
  "institutions", "languages", "literature", "knowledgeHeritage"
];

const CATEGORY_LABELS = {
  heritage: "Heritage",
  traditions: "Traditions",
  festivals: "Festivals",
  arts: "Arts",
  crafts: "Crafts",
  textiles: "Textiles",
  music: "Music",
  instruments: "Musical instruments",
  cuisine: "Cuisine",
  communities: "Communities",
  culturalPlaces: "Cultural places",
  institutions: "Cultural institutions",
  languages: "Languages",
  literature: "Literature",
  knowledgeHeritage: "Traditional knowledge"
};

function normalize(value) {
  return String(value ?? "").trim().toLocaleLowerCase();
}

function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

function slugify(value) {
  return normalize(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function resolveState(state) {
  if (!state) return null;

  if (typeof state === "object") {
    if (state.id) {
      return statesData.find((item) => normalize(item.id) === normalize(state.id)) || null;
    }
    if (state.name) {
      return statesData.find((item) => normalize(item.name) === normalize(state.name)) || null;
    }
    return null;
  }

  const value = normalize(state);
  return statesData.find(
    (item) => normalize(item.id) === value || normalize(item.name) === value
  ) || null;
}

function normalizeSource(source) {
  if (!source || typeof source !== "object") return null;
  const url = typeof source.url === "string" ? source.url.trim() : "";
  return {
    title: String(source.title || source.name || "Reference source").trim(),
    type: String(source.type || "").trim(),
    url
  };
}

export function getStateSources(state) {
  const resolved = resolveState(state);
  if (!resolved || !Array.isArray(resolved.sources)) return [];
  return resolved.sources.map(normalizeSource).filter(
    (source) => source && /^https?:\/\//i.test(source.url)
  );
}

function normalizeUnesco(value) {
  if (value === true) return "UNESCO World Heritage";
  if (value === false || value == null) return null;

  const text = String(value).trim();
  const key = text.toLowerCase().replace(/[ _]+/g, "-");
  if (!text || ["none", "false", "no", "not-listed", "n/a", "na", "null"].includes(key)) {
    return null;
  }
  if (key === "world-heritage" || key === "unesco-world-heritage") {
    return "UNESCO World Heritage";
  }
  return text;
}

function normalizeRecord(item, state, categoryKey) {
  const rawDescription = typeof item.description === "string" ? item.description.trim() : "";
  const rawSignificance = typeof item.significance === "string" ? item.significance.trim() : "";
  const rawName = item.name || item.title || "Untitled cultural entry";
  const description = rawDescription || rawSignificance ||
    "Additional details for this entry are being curated and verified.";
  const unesco = normalizeUnesco(item.unesco ?? item.unescoStatus);

  return {
    ...item,
    id: String(item.id || `${state.id}-${categoryKey}-${slugify(rawName)}`),
    name: String(rawName).trim(),
    description,
    descriptionStatus: rawDescription ? "provided" : rawSignificance ? "derived-from-significance" : "needs-curation",
    significance: rawSignificance || rawDescription,
    categoryKey,
    categoryLabel: CATEGORY_LABELS[categoryKey] || categoryKey,
    state: state.name,
    stateId: state.id,
    regionalSources: getStateSources(state),
    unesco,
    unescoStatus: unesco ? (String(item.unescoStatus || unesco).toLowerCase().replace(/[ _]+/g, "-")) : "none"
  };
}

function languageRecords(state) {
  if (!Array.isArray(state.languages)) return [];
  return state.languages.map((value, index) => {
    const item = typeof value === "string" ? { name: value } : (value || {});
    const languageName = item.name || item.title || `Language ${index + 1}`;
    return normalizeRecord({
      ...item,
      id: item.id || slugify(languageName),
      name: languageName,
      description: item.description || `${languageName} is listed among the languages associated with ${state.name}. Detailed language notes are being curated.`
    }, state, "languages");
  });
}

function addStateMeta(items, state, categoryKey) {
  const values = Array.isArray(items) ? items : [];
  return values
    .filter((item) => item && typeof item === "object")
    .map((item) => normalizeRecord(item, state, categoryKey));
}

function flattenCategory(categoryKey) {
  return statesData.flatMap((state) => {
    if (categoryKey === "languages") return languageRecords(state);
    return addStateMeta(state[categoryKey], state, categoryKey);
  });
}

function getAll(categoryKey) {
  return flattenCategory(categoryKey);
}

function getByState(categoryKey, state) {
  const resolved = resolveState(state);
  if (!resolved) return [];
  return categoryKey === "languages"
    ? languageRecords(resolved)
    : addStateMeta(resolved[categoryKey], resolved, categoryKey);
}

export function getAllStates() {
  return statesData;
}

export function getStateById(id) {
  return resolveState(id);
}

export function getStateHeritage(state) {
  return getHeritageByState(state);
}

export function getAllHeritage() {
  return getAll("heritage");
}

export function getHeritageById(id) {
  return getAllHeritage().find((item) => normalize(item.id) === normalize(id)) || null;
}

export function getHeritageByState(state) {
  return getByState("heritage", state);
}

export function getHeritageByCategory(category) {
  const value = normalize(category);
  return getAllHeritage().filter((item) => normalize(item.category) === value);
}

export function getHeritageByEra(era) {
  const value = normalize(era);
  return getAllHeritage().filter(
    (item) => normalize(item.era) === value || normalize(item.period) === value
  );
}

export function getUNESCOHeritage() {
  return getAllHeritage().filter((item) => Boolean(item.unesco));
}

export function getAllTraditions() { return getAll("traditions"); }
export function getTraditionsByState(state) { return getByState("traditions", state); }
export function getAllFestivals() { return getAll("festivals"); }
export function getFestivalsByState(state) { return getByState("festivals", state); }
export function getAllArts() { return getAll("arts"); }
export function getArtsByState(state) { return getByState("arts", state); }
export function getAllCrafts() { return getAll("crafts"); }
export function getCraftsByState(state) { return getByState("crafts", state); }
export function getAllTextiles() { return getAll("textiles"); }
export function getTextilesByState(state) { return getByState("textiles", state); }
export function getAllMusic() { return getAll("music"); }
export function getMusicByState(state) { return getByState("music", state); }
export function getAllInstruments() { return getAll("instruments"); }
export function getInstrumentsByState(state) { return getByState("instruments", state); }
export function getAllCuisine() { return getAll("cuisine"); }
export function getCuisineByState(state) { return getByState("cuisine", state); }
export function getAllCommunities() { return getAll("communities"); }
export function getCommunitiesByState(state) { return getByState("communities", state); }
export function getAllCulturalPlaces() { return getAll("culturalPlaces"); }
export function getCulturalPlacesByState(state) { return getByState("culturalPlaces", state); }
export function getAllInstitutions() { return getAll("institutions"); }
export function getInstitutionsByState(state) { return getByState("institutions", state); }
export function getAllLanguages() { return getAll("languages"); }
export function getLanguagesByState(state) { return getByState("languages", state); }
export function getAllLiterature() { return getAll("literature"); }
export function getLiteratureByState(state) { return getByState("literature", state); }
export function getAllKnowledgeHeritage() { return getAll("knowledgeHeritage"); }
export function getKnowledgeHeritageByState(state) { return getByState("knowledgeHeritage", state); }

export function getCultureByState(state) {
  const resolved = resolveState(state);
  if (!resolved) {
    return {
      state: null,
      heritage: [], festivals: [], traditions: [], music: [], instruments: [],
      arts: [], crafts: [], textiles: [], cuisine: [], communities: [],
      culturalPlaces: [], institutions: [], languages: [], literature: [],
      knowledgeHeritage: []
    };
  }

  return {
    state: resolved,
    heritage: getHeritageByState(resolved),
    festivals: getFestivalsByState(resolved),
    traditions: getTraditionsByState(resolved),
    music: getMusicByState(resolved),
    instruments: getInstrumentsByState(resolved),
    arts: getArtsByState(resolved),
    crafts: getCraftsByState(resolved),
    textiles: getTextilesByState(resolved),
    cuisine: getCuisineByState(resolved),
    communities: getCommunitiesByState(resolved),
    culturalPlaces: getCulturalPlacesByState(resolved),
    institutions: getInstitutionsByState(resolved),
    languages: getLanguagesByState(resolved),
    literature: getLiteratureByState(resolved),
    knowledgeHeritage: getKnowledgeHeritageByState(resolved)
  };
}

const CATEGORY_GETTERS = {
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

export function getCultureItemById(categoryKey, id, stateId) {
  const getter = CATEGORY_GETTERS[categoryKey];
  if (!getter) return null;
  return getter().find((item) =>
    normalize(item.id) === normalize(id) &&
    (!stateId || normalize(item.stateId) === normalize(stateId))
  ) || null;
}

function searchableText(item) {
  return normalizeSearchText([
    item.name, item.state, item.stateId, item.region, item.location, item.city,
    item.category, item.categoryKey, item.categoryLabel, item.type, item.period,
    item.era, item.unesco, item.description, item.significance,
    ...(Array.isArray(item.tags) ? item.tags : []),
    ...(Array.isArray(item.alternateNames) ? item.alternateNames : [])
  ].filter(Boolean).join(" "));
}

export function searchCulture(query) {
  const term = normalizeSearchText(query);
  const result = {};
  for (const key of CATEGORY_KEYS) {
    result[key] = getAll(key).filter((item) => searchableText(item).includes(term));
  }
  return result;
}

export function getRelatedContent(item) {
  if (!item) {
    return { heritage: [], traditions: [], festivals: [], arts: [], crafts: [], music: [], cuisine: [] };
  }
  const state = resolveState(item.stateId || item.state);
  if (!state) {
    return { heritage: [], traditions: [], festivals: [], arts: [], crafts: [], music: [], cuisine: [] };
  }
  return {
    heritage: getHeritageByState(state).filter((entry) => entry.id !== item.id),
    traditions: getTraditionsByState(state),
    festivals: getFestivalsByState(state),
    arts: getArtsByState(state),
    crafts: getCraftsByState(state),
    music: getMusicByState(state),
    cuisine: getCuisineByState(state)
  };
}

export function getCultureStats() {
  const stats = {
    states: statesData.length,
    heritageSites: getAllHeritage().length,
    traditions: getAllTraditions().length,
    festivals: getAllFestivals().length,
    arts: getAllArts().length,
    crafts: getAllCrafts().length,
    textiles: getAllTextiles().length,
    music: getAllMusic().length,
    instruments: getAllInstruments().length,
    cuisine: getAllCuisine().length,
    communities: getAllCommunities().length,
    culturalPlaces: getAllCulturalPlaces().length,
    institutions: getAllInstitutions().length,
    languages: getAllLanguages().length,
    literature: getAllLiterature().length,
    knowledgeHeritage: getAllKnowledgeHeritage().length
  };
  return { ...stats, categoryCount: CATEGORY_KEYS.length };
}

export function resolveStateName(state) {
  const resolved = resolveState(state);
  return resolved ? resolved.name : String(state ?? "").trim();
}

export { resolveState };
