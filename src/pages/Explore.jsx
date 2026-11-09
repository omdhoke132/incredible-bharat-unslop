import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import HeritageCard from "../components/HeritageCard";
import {
  getAllHeritage,
  getAllTraditions,
  getAllFestivals,
  getAllArts,
  getAllCrafts,
  getAllTextiles,
  getAllMusic,
  getAllInstruments,
  getAllCuisine,
  getAllCommunities,
  getAllCulturalPlaces,
  getAllLiterature,
  getAllKnowledgeHeritage,
  getAllInstitutions,
  getAllLanguages,
  getAllStates
} from "../services/cultureService";

const collections = {
  heritage: {
    label: "Heritage",
    eyebrow: "PLACES & MONUMENTS",
    icon: "🏛️",
    getter: getAllHeritage
  },
  traditions: {
    label: "Traditions",
    eyebrow: "LIVING TRADITIONS",
    icon: "🎭",
    getter: getAllTraditions
  },
  festivals: {
    label: "Festivals",
    eyebrow: "FESTIVALS & FAIRS",
    icon: "🪔",
    getter: getAllFestivals
  },
  arts: {
    label: "Arts",
    eyebrow: "VISUAL ARTS",
    icon: "🎨",
    getter: getAllArts
  },
  crafts: {
    label: "Crafts",
    eyebrow: "CRAFT HERITAGE",
    icon: "🧵",
    getter: getAllCrafts
  },
  textiles: {
    label: "Textiles",
    eyebrow: "TEXTILE HERITAGE",
    icon: "🧶",
    getter: getAllTextiles
  },
  music: {
    label: "Music",
    eyebrow: "MUSICAL TRADITIONS",
    icon: "🎶",
    getter: getAllMusic
  },
  instruments: {
    label: "Instruments",
    eyebrow: "MUSICAL INSTRUMENTS",
    icon: "🥁",
    getter: getAllInstruments
  },
  cuisine: {
    label: "Cuisine",
    eyebrow: "FOOD HERITAGE",
    icon: "🍛",
    getter: getAllCuisine
  },
  communities: {
    label: "Communities",
    eyebrow: "PEOPLE & COMMUNITIES",
    icon: "👥",
    getter: getAllCommunities
  },
  culturalPlaces: {
    label: "Places",
    eyebrow: "CULTURAL PLACES",
    icon: "📍",
    getter: getAllCulturalPlaces
  },
  literature: {
    label: "Literature",
    eyebrow: "LITERARY HERITAGE",
    icon: "📖",
    getter: getAllLiterature
  },
  knowledgeHeritage: {
    label: "Knowledge",
    eyebrow: "KNOWLEDGE HERITAGE",
    icon: "🧠",
    getter: getAllKnowledgeHeritage
  },
  institutions: {
    label: "Institutions",
    eyebrow: "CULTURAL INSTITUTIONS",
    icon: "🏫",
    getter: getAllInstitutions
  },
  languages: {
    label: "Languages",
    eyebrow: "LANGUAGES & ORAL HERITAGE",
    icon: "🗣️",
    getter: getAllLanguages
  }
};

function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

function searchableText(item) {
  return [
    item.name,
    item.state,
    item.stateId,
    item.region,
    item.location,
    item.city,
    item.category,
    item.type,
    item.period,
    item.unesco,
    item.description,
    item.significance,
    item.era,
    item.tags,
    item.alternateNames
  ]
    .filter(Boolean)
    .flatMap((value) => Array.isArray(value) ? value : [value])
    .filter((value) => typeof value === "string" || typeof value === "number")
    .join(" ")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const states = useMemo(() => getAllStates(), []);
  const requestedCategory = searchParams.get("category") || "";
  const requestedState = searchParams.get("state") || "";
  const [search, setSearch] = useState(() => searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(() =>
    Object.hasOwn(collections, requestedCategory) ? requestedCategory : "all"
  );
  const [activeState, setActiveState] = useState(() =>
    states.some((state) => state.id === requestedState) ? requestedState : ""
  );

  const updateSearchParam = (key, value) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      if (value) nextParams.set(key, value);
      else nextParams.delete(key);
      return nextParams;
    }, { replace: true });
  };

  const changeSearch = (value) => {
    setSearch(value);
    updateSearchParam("q", value.trim());
  };

  const changeCategory = (category) => {
    setActiveCategory(category);
    updateSearchParam("category", category === "all" ? "" : category);
  };

  const changeState = (stateId) => {
    setActiveState(stateId);
    updateSearchParam("state", stateId);
  };

  const resetFilters = () => {
    setSearch("");
    setActiveCategory("all");
    setActiveState("");
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const allData = useMemo(() => {
    return Object.fromEntries(
      Object.entries(collections).map(([key, config]) => [
        key,
        config.getter()
      ])
    );
  }, []);

  const filteredData = useMemo(() => {
    const term = normalizeSearchText(search.trim());

    return Object.fromEntries(
      Object.entries(allData).map(([key, items]) => [
        key,
        items.filter((item) => {
          const matchesSearch = !term || searchableText(item).includes(term);
          const matchesState = !activeState || item.stateId === activeState;
          return matchesSearch && matchesState;
        })
      ])
    );
  }, [allData, search, activeState]);

  const visibleCategories =
    activeCategory === "all"
      ? Object.keys(collections)
      : [activeCategory];

  const totalResults = visibleCategories.reduce(
    (total, key) =>
      total + (filteredData[key]?.length || 0),
    0
  );

  const hasSearch = search.trim().length > 0;

  return (
    <>
      <Navbar />

      <main className="explore-page">
        <section className="explore-hero">
          <div className="explore-hero-inner">
            <p className="eyebrow">EXPLORE BHARAT</p>

            <h1>
              Discover India's
              <br />
              <span>Living Heritage.</span>
            </h1>

            <p>
              Explore monuments, traditions, festivals, arts,
              crafts, food, music, communities and knowledge
              from across India's cultural landscapes.
            </p>
          </div>
        </section>

        <section className="explore-content">
          <div className="explore-toolbar">
            <div className="explore-search-row">
              <SearchBar
                value={search}
                onChange={changeSearch}
              />

              <label className="explore-state-filter">
                <span>Filter by state</span>
                <select
                  value={activeState}
                  onChange={(event) => changeState(event.target.value)}
                  aria-label="Filter cultural entries by state"
                >
                  <option value="">All currently curated states</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="category-filters">
              <button
                type="button"
                className={
                  activeCategory === "all"
                    ? "filter-btn active"
                    : "filter-btn"
                }
                onClick={() => changeCategory("all")}
              >
                Everything
              </button>

              {Object.entries(collections).map(
                ([key, config]) => (
                  <button
                    key={key}
                    type="button"
                    className={
                      activeCategory === key
                        ? "filter-btn active"
                        : "filter-btn"
                    }
                    onClick={() =>
                      changeCategory(key)
                    }
                  >
                    {config.icon} {config.label}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="results-header">
            <div>
              <p className="eyebrow">
                CULTURAL COLLECTION
              </p>

              <h2>
                {totalResults}{" "}
                {totalResults === 1
                  ? "discovery"
                  : "discoveries"}
              </h2>
            </div>

            {(hasSearch ||
              activeCategory !== "all" ||
              activeState) && (
              <button
                type="button"
                className="reset-btn"
                onClick={resetFilters}
              >
                Reset Filters ×
              </button>
            )}
          </div>

          {totalResults === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">⌕</div>

              <h2>No discoveries found</h2>

              <p>
                Try another monument, state, festival,
                tradition, art, craft, food or cultural
                keyword.
              </p>

              <button
                type="button"
                className="primary-btn"
                onClick={resetFilters}
              >
                Explore Everything
              </button>
            </div>
          ) : (
            visibleCategories.map((categoryKey) => {
              const config = collections[categoryKey];
              const items = filteredData[categoryKey] || [];

              if (items.length === 0) {
                return null;
              }

              const isHeritage =
                categoryKey === "heritage";

              return (
                <section
                  className="explore-result-section"
                  key={categoryKey}
                >
                  <div className="explore-result-heading">
                    <div>
                      <p className="eyebrow">
                        {config.eyebrow}
                      </p>

                      <h2>
                        {config.icon} {config.label}
                      </h2>
                    </div>

                    <span>
                      {items.length} results
                    </span>
                  </div>

                  {isHeritage ? (
                    <div className="heritage-grid">
                      {items.map((item) => (
                        <HeritageCard
                          key={`${categoryKey}-${item.stateId}-${item.id}`}
                          heritage={item}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="culture-grid">
                      {items.map((item) => (
                        <CultureCard
                          key={`${categoryKey}-${item.stateId}-${item.id}`}
                          item={item}
                          category={categoryKey}
                          config={config}
                        />
                      ))}
                    </div>
                  )}
                </section>
              );
            })
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function CultureCard({
  item,
  category,
  config
}) {
  const secondary =
    item.category ||
    item.type ||
    item.location ||
    item.city ||
    item.region ||
    "";

  const tertiary =
    category === "heritage"
      ? item.unesco || item.period
      : item.region || item.city || "";

  return (
    <Link to={`/culture/${category}/${item.stateId}/${encodeURIComponent(item.id)}`} className="culture-card culture-card-link">
      <div className="culture-card-top">
        <span className="culture-icon">
          {config.icon}
        </span>

        <span className="culture-type">
          {config.label}
        </span>
      </div>

      <div className="culture-card-content">
        <div className="culture-meta">
          <span>{item.state}</span>

          {secondary && <span>•</span>}

          <span>{secondary}</span>
        </div>

        <h3>{item.name}</h3>

        <p>{item.description}</p>

        {item.descriptionStatus === "needs-curation" && (
          <small className="content-review-note">Description under editorial review</small>
        )}

        {tertiary && (
          <div className="heritage-tags">
            <span>{tertiary}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default Explore;
