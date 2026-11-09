import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getHeritageById,
  getRelatedContent,
  getStateSources
} from "../services/cultureService";

function HeritageDetail() {
  const { id } = useParams();

  const heritage = getHeritageById(id);
  const related = heritage
    ? getRelatedContent(heritage)
    : null;

  if (!heritage) {
    return (
      <>
        <Navbar />

        <main className="page">
          <div className="page-container heritage-not-found">
            <p className="eyebrow">DISCOVERY NOT FOUND</p>

            <h1>We couldn't find that heritage site.</h1>

            <p className="page-subtitle">
              The place may not exist in the current curated
              collection.
            </p>

            <Link
              to="/explore"
              className="primary-btn heritage-back-button"
            >
              Back to Explore →
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="heritage-detail-page">
        <div className="heritage-detail-container">
          <Link
            to="/explore"
            className="back-link"
          >
            ← Back to Explore
          </Link>

          <section className="heritage-detail-hero">
            <div className="heritage-detail-main">
              <p className="eyebrow">
                HERITAGE DETAIL
              </p>

              <h1>{heritage.name}</h1>

              <p className="heritage-detail-description">
                {heritage.description}
              </p>

              {heritage.descriptionStatus === "needs-curation" && (
                <p className="content-review-note" role="note">
                  This entry is listed in the collection, but its description needs editorial verification.
                </p>
              )}

              <div className="heritage-detail-tags">
                {heritage.state && (
                  <span>{heritage.state}</span>
                )}

                {heritage.location && (
                  <span>{heritage.location}</span>
                )}

                {heritage.period && (
                  <span>{heritage.period}</span>
                )}

                {heritage.unesco && (
                  <span className="heritage-detail-unesco">
                    {heritage.unesco}
                  </span>
                )}
              </div>
            </div>

            <div className="heritage-detail-symbol">
              🏛️
            </div>
          </section>

          <section className="heritage-detail-body">
            <div className="heritage-story">
              <p className="eyebrow">THE STORY</p>

              <h2>Why it matters.</h2>

              <p>
                {heritage.significance ||
                  "This heritage site represents an important part of India's cultural history."}
              </p>
            </div>

            <aside className="heritage-facts">
              <p className="eyebrow">
                QUICK FACTS
              </p>

              {heritage.state && (
                <Fact
                  label="State"
                  value={heritage.state}
                />
              )}

              {heritage.location && (
                <Fact
                  label="Location"
                  value={heritage.location}
                />
              )}

              {heritage.period && (
                <Fact
                  label="Period"
                  value={heritage.period}
                />
              )}

              {heritage.unesco && (
                <Fact
                  label="UNESCO"
                  value={heritage.unesco}
                />
              )}
            </aside>
          </section>


          {getStateSources(heritage.stateId || heritage.state).length > 0 && (
            <section className="heritage-sources">
              <p className="eyebrow">RESEARCH STARTING POINTS</p>
              <h2>References for {heritage.state}</h2>
              <p className="culture-reference-note">
                These are regional references supplied with the state collection. They are useful starting points, but are not guaranteed to substantiate every statement about this site; item-specific citations should be added during editorial review.
              </p>
              <ul className="culture-source-list">
                {getStateSources(heritage.stateId || heritage.state).map((source) => (
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

          {related && (
            <section className="heritage-related">
              <div className="heritage-related-heading">
                <div>
                  <p className="eyebrow">
                    FROM THE SAME REGION
                  </p>

                  <h2>
                    More from {heritage.state}
                  </h2>
                </div>
              </div>

              <div className="heritage-related-grid">
                {related.heritage
                  .slice(0, 3)
                  .map((item) => (
                    <Link
                      key={item.id}
                      to={`/heritage/${item.id}`}
                      className="heritage-related-card"
                    >
                      <span>🏛️</span>

                      <div>
                        <strong>
                          {item.name}
                        </strong>

                        <small>
                          {item.period ||
                            item.location ||
                            "Heritage"}
                        </small>
                      </div>

                      <span>→</span>
                    </Link>
                  ))}
              </div>

              <div className="heritage-related-culture">
                {related.traditions
                  .slice(0, 3)
                  .map((item) => (
                    <div
                      key={`tradition-${item.id}`}
                      className="heritage-mini-pill"
                    >
                      🎭 {item.name}
                    </div>
                  ))}

                {related.festivals
                  .slice(0, 3)
                  .map((item) => (
                    <div
                      key={`festival-${item.id}`}
                      className="heritage-mini-pill"
                    >
                      🪔 {item.name}
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function Fact({ label, value }) {
  return (
    <div className="heritage-fact">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

export default HeritageDetail;

