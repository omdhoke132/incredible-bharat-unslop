import { Link } from "react-router-dom";
import { getCultureStats } from "../services/cultureService";

function Hero() {
  const cultureStats = getCultureStats();

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-kicker">
          <span>✦</span>
          <span>A LIVING CULTURAL ATLAS</span>
          <span>✦</span>
        </div>

        <p className="eyebrow">THE SOUL OF INDIA</p>

        <h1>
          Discover the
          <br />
          <em>stories</em> behind
          <br />
          <span>Bharat.</span>
        </h1>

        <p className="hero-text">
          Travel through monuments, festivals, traditions, arts, crafts,
          music, food and knowledge — brought together as one immersive
          cultural journey.
        </p>

        <div className="hero-buttons">
          <Link to="/explore" className="primary-btn">
            Explore Bharat <span>→</span>
          </Link>

          <Link to="/ai-guide" className="secondary-btn">
            <span>✦</span> Meet the AI Guide
          </Link>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <strong>{cultureStats.states}</strong>
            <span>Curated States</span>
          </div>

          <div className="stat-line"></div>

          <div className="hero-stat">
            <strong>{cultureStats.categoryCount}</strong>
            <span>Content Categories</span>
          </div>

          <div className="stat-line"></div>

          <div className="hero-stat">
            <strong>∞</strong>
            <span>Stories to Discover</span>
          </div>
        </div>
      </div>

      <div className="hero-art" aria-hidden="true">
        <div className="hero-art-label">INCREDIBLE BHARAT</div>

        <div className="hero-circle circle-one"></div>
        <div className="hero-circle circle-two"></div>
        <div className="hero-circle circle-three"></div>

        <div className="hero-symbol">ॐ</div>

        <div className="hero-stars">
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
          <span>✧</span>
        </div>

        <div className="hero-art-caption">
          <span>HERITAGE</span>
          <span>•</span>
          <span>CULTURE</span>
          <span>•</span>
          <span>IDENTITY</span>
        </div>
      </div>

      <div className="hero-scroll">
        <span></span>
        SCROLL TO DISCOVER
      </div>
    </section>
  );
}

export default Hero;