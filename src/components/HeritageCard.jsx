import { Link } from "react-router-dom";

function HeritageCard({ heritage }) {
  return (
    <article className="heritage-card">
      <div className="heritage-card-top">
        <span className="heritage-icon">
          {heritage.icon || "🏛️"}
        </span>

        {heritage.unesco && (
          <span className="unesco-badge">
            {heritage.unesco}
          </span>
        )}
      </div>

      <div className="heritage-card-content">
        <div className="heritage-meta">
          <span>{heritage.state}</span>
          <span>•</span>
          <span>
            {heritage.period || heritage.era || "Historic"}
          </span>
        </div>

        <h3>{heritage.name}</h3>

        <p>{heritage.description}</p>

        {heritage.descriptionStatus === "needs-curation" && (
          <small className="content-review-note">Description under editorial review</small>
        )}

        <div className="heritage-tags">
          {(heritage.tags || []).slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <Link
          to={`/heritage/${heritage.id}`}
          className="heritage-link"
        >
          Discover Story <span>→</span>
        </Link>
      </div>
    </article>
  );
}

export default HeritageCard;
