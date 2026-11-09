import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllStates,
  getCultureByState
} from "../services/cultureService";

const CATEGORY_CONFIG = [
  { key: "heritage", title: "Heritage", icon: "🏛️", label: "HERITAGE" },
  { key: "festivals", title: "Festivals", icon: "🪔", label: "FESTIVALS" },
  { key: "traditions", title: "Traditions", icon: "🎭", label: "TRADITIONS" },
  { key: "arts", title: "Arts", icon: "🎨", label: "ARTS" },
  { key: "crafts", title: "Crafts", icon: "🧵", label: "CRAFTS" },
  { key: "music", title: "Music", icon: "🎶", label: "MUSIC" },
  { key: "instruments", title: "Instruments", icon: "🥁", label: "INSTRUMENTS" },
  { key: "textiles", title: "Textiles", icon: "🧶", label: "TEXTILES" },
  { key: "cuisine", title: "Cuisine", icon: "🍛", label: "CUISINE" },
  { key: "communities", title: "Communities", icon: "👥", label: "COMMUNITIES" },
  { key: "institutions", title: "Institutions", icon: "🏫", label: "INSTITUTIONS" },
  { key: "languages", title: "Languages", icon: "🗣️", label: "LANGUAGES" },
  { key: "culturalPlaces", title: "Cultural Places", icon: "📍", label: "PLACES" },
  { key: "literature", title: "Literature", icon: "📖", label: "LITERATURE" },
  {
    key: "knowledgeHeritage",
    title: "Knowledge Heritage",
    icon: "🧠",
    label: "KNOWLEDGE"
  }
];

function StateExplorer() {
  const states = getAllStates();

  const [selectedState, setSelectedState] = useState(
    states[0]?.id || ""
  );

  const [activeCategory, setActiveCategory] = useState("heritage");

  const culture = useMemo(
    () => getCultureByState(selectedState),
    [selectedState]
  );

  const activeState = culture?.state;

  const selectedItems =
    culture?.[activeCategory] || [];

  const visibleCategories = CATEGORY_CONFIG.filter(
    (category) =>
      Array.isArray(culture?.[category.key])
        ? culture[category.key].length > 0
        : false
  );

  const totalDiscoveries = CATEGORY_CONFIG.reduce(
    (total, category) =>
      total +
      (Array.isArray(culture?.[category.key])
        ? culture[category.key].length
        : 0),
    0
  );

  return (
    <section className="state-explorer" id="state-explorer">
      <div className="state-explorer-heading">
        <div>
          <p className="eyebrow">EXPLORE BY REGION</p>

          <h2>India, state by state.</h2>

          <p>
            Discover the heritage, traditions, arts, people, food and
            knowledge that make every region unique.
          </p>
        </div>

        {activeState && (
          <div className="state-explorer-stat">
            <strong>{totalDiscoveries}</strong>
            <span>discoveries</span>
          </div>
        )}
      </div>

      <div className="state-layout">
        <aside className="state-selector">
          <div className="state-selector-label">
            <span>Choose a state</span>
            <strong>{states.length} states</strong>
          </div>

          <div className="state-list">
            {states.map((state) => (
              <button
                key={state.id}
                type="button"
                className={
                  selectedState === state.id
                    ? "state-option active"
                    : "state-option"
                }
                onClick={() => {
                  setSelectedState(state.id);
                  setActiveCategory("heritage");
                }}
              >
                <span className="state-option-info">
                  <strong>{state.name}</strong>
                  <small>{state.region}</small>
                </span>

                <span className="state-option-arrow">
                  →
                </span>
              </button>
            ))}
          </div>
        </aside>

        {activeState && (
          <div className="state-detail">
            <div className="state-detail-hero">
              <div>
                <p className="eyebrow">{activeState.region}</p>

                <h3>{activeState.name}</h3>

                <p>{activeState.description}</p>
              </div>

              <div className="state-identity">
                <div className="state-identity-number">
                  {String(
                    states.findIndex(
                      (state) => state.id === activeState.id
                    ) + 1
                  ).padStart(2, "0")}
                </div>

                <span>REGION</span>
              </div>
            </div>

            <div className="state-category-tabs">
              {visibleCategories.map((category) => (
                <button
                  key={category.key}
                  type="button"
                  className={
                    activeCategory === category.key
                      ? "state-category-tab active"
                      : "state-category-tab"
                  }
                  onClick={() =>
                    setActiveCategory(category.key)
                  }
                >
                  <span>{category.icon}</span>
                  <span>{category.title}</span>
                  <strong>
                    {culture[category.key]?.length || 0}
                  </strong>
                </button>
              ))}
            </div>

            <div className="state-active-category">
              {(() => {
                const config = CATEGORY_CONFIG.find(
                  (category) =>
                    category.key === activeCategory
                );

                return (
                  <div className="state-active-category-heading">
                    <div>
                      <p className="eyebrow">
                        {config?.label || "DISCOVER"}
                      </p>

                      <h4>
                        {config?.icon}{" "}
                        {config?.title}
                      </h4>
                    </div>

                    <span>
                      {selectedItems.length} entries
                    </span>
                  </div>
                );
              })()}

              {selectedItems.length === 0 ? (
                <div className="state-empty-category">
                  <span>✦</span>
                  <p>
                    More discoveries from this category are
                    coming soon.
                  </p>
                </div>
              ) : (
                <div className="state-culture-items state-culture-items-rich">
                  {selectedItems
                    .slice(0, 8)
                    .map((item) => (
                      <CultureItem
                        key={`${activeCategory}-${item.stateId}-${item.id}`}
                        item={item}
                        category={activeCategory}
                      />
                    ))}
                </div>
              )}

              {selectedItems.length > 8 && (
                <Link
                  to={`/explore?category=${encodeURIComponent(activeCategory)}&state=${encodeURIComponent(activeState.id)}`}
                  className="state-see-more"
                >
                  Explore all {selectedItems.length}{" "}
                  discoveries →
                </Link>
              )}
            </div>

            <div className="state-quick-grid">
              <QuickStat
                label="Heritage"
                value={culture.heritage?.length || 0}
                icon="🏛️"
              />

              <QuickStat
                label="Festivals"
                value={culture.festivals?.length || 0}
                icon="🪔"
              />

              <QuickStat
                label="Arts & Crafts"
                value={
                  (culture.arts?.length || 0) +
                  (culture.crafts?.length || 0)
                }
                icon="🎨"
              />

              <QuickStat
                label="Cuisine"
                value={culture.cuisine?.length || 0}
                icon="🍛"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CultureItem({ item, category }) {
  const destination = category === "heritage"
    ? `/heritage/${encodeURIComponent(item.id)}`
    : `/culture/${category}/${item.stateId}/${encodeURIComponent(item.id)}`;
  const secondaryText =
    item.category ||
    item.type ||
    item.location ||
    item.city ||
    item.region ||
    "";

  const extraText =
    category === "heritage" && item.unesco
      ? item.unesco
      : item.period || "";

  return (
    <Link to={destination} className="state-culture-item">
      <div className="state-culture-item-icon">
        {getItemIcon(category)}
      </div>

      <div className="state-culture-item-content">
        <strong>{item.name}</strong>

        {secondaryText && (
          <small>{secondaryText}</small>
        )}

        {extraText && (
          <span>{extraText}</span>
        )}
      </div>
      <span aria-hidden="true" className="state-culture-item-arrow">→</span>
    </Link>
  );
}

function QuickStat({ label, value, icon }) {
  return (
    <div className="state-quick-stat">
      <span>{icon}</span>

      <div>
        <strong>{value}</strong>
        <small>{label}</small>
      </div>
    </div>
  );
}

function getItemIcon(category) {
  const icons = {
    heritage: "🏛️",
    festivals: "🪔",
    traditions: "🎭",
    arts: "🎨",
    crafts: "🧵",
    music: "🎶",
    textiles: "🧶",
    instruments: "🥁",
    cuisine: "🍛",
    communities: "👥",
    institutions: "🏫",
    languages: "🗣️",
    culturalPlaces: "📍",
    literature: "📖",
    knowledgeHeritage: "🧠"
  };

  return icons[category] || "✦";
}

export default StateExplorer;
