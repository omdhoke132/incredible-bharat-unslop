import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCultureItemById, getStateSources } from "../services/cultureService";

const CATEGORY_TITLES = {
  traditions: "Tradition",
  festivals: "Festival",
  arts: "Art",
  crafts: "Craft",
  textiles: "Textile tradition",
  music: "Musical tradition",
  instruments: "Musical instrument",
  cuisine: "Cuisine",
  communities: "Community",
  culturalPlaces: "Cultural place",
  institutions: "Cultural institution",
  languages: "Language",
  literature: "Literature",
  knowledgeHeritage: "Traditional knowledge"
};

function CulturalDetail() {
  const { category, stateId, id } = useParams();
  const item = getCultureItemById(category, id, stateId);
  const sources = item ? getStateSources(item.stateId) : [];
  const title = CATEGORY_TITLES[category] || "Cultural discovery";

  if (!item) {
    return (
      <div className="culture-detail-page">
        <Navbar />
        <main className="page-container culture-detail-not-found">
          <p className="eyebrow">DISCOVERY NOT FOUND</p>
          <h1>We couldn't find this cultural entry.</h1>
          <p>It may have moved or may not be part of the current curated collection.</p>
          <Link to="/explore" className="primary-btn">Return to Explore →</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const facts = [
    ["State", item.state],
    ["Region", item.region],
    ["Location", item.location || item.city],
    ["Period", item.period || item.era],
    ["Category", item.category || item.type || title],
    ["UNESCO status", item.unesco]
  ].filter(([, value]) => Boolean(value));

  return (
    <div className="culture-detail-page">
      <Navbar />
      <main className="culture-detail-main">
        <div className="culture-detail-container">
          <Link to="/explore" className="back-link">← Back to Explore</Link>

          <section className="culture-detail-hero">
            <p className="eyebrow">{title.toUpperCase()} · {item.state}</p>
            <h1>{item.name}</h1>
            <p className="culture-detail-description">{item.description}</p>
            {item.descriptionStatus === "needs-curation" && (
              <p className="content-review-note">
                This entry is listed in the collection, but its description needs editorial verification.
              </p>
            )}
            <div className="culture-detail-tags">
              {item.type && <span>{item.type}</span>}
              {item.category && <span>{item.category}</span>}
              {item.unesco && <span>{item.unesco}</span>}
            </div>
          </section>

          <div className="culture-detail-grid">
            <section className="culture-detail-story">
              <p className="eyebrow">CULTURAL CONTEXT</p>
              <h2>Why it matters</h2>
              <p>{item.significance || item.description}</p>
              {Array.isArray(item.tags) && item.tags.length > 0 && (
                <div className="culture-detail-tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              )}
            </section>

            <aside className="culture-detail-facts">
              <p className="eyebrow">QUICK FACTS</p>
              {facts.map(([label, value]) => (
                <div className="heritage-fact" key={label}>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </div>
              ))}
            </aside>
          </div>

          {sources.length > 0 && (
            <section className="culture-reference-section">
              <p className="eyebrow">RESEARCH STARTING POINTS</p>
              <h2>References for {item.state}</h2>
              <p className="culture-reference-note">
                These are regional reference sources supplied with the state collection. They are not guaranteed to substantiate every statement on this page; item-specific citations should be added during editorial review.
              </p>
              <ul className="culture-source-list">
                {sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.title} <span aria-hidden="true">↗</span>
                    </a>
                    {source.type && <small>{source.type}</small>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="culture-detail-actions">
            <Link to="/explore" className="primary-btn">Discover more culture →</Link>
            <Link to="/" className="secondary-btn">Back to Incredible Bharat</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CulturalDetail;
