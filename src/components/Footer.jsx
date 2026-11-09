import { Link } from "react-router-dom";

const words = ["Heritage", "Festivals", "Traditions", "Crafts", "Music", "Cuisine", "Languages", "Literature"];

export default function Footer() {
  return <footer className="site-footer bh-footer">
    <div className="bh-footer-marquee" aria-hidden="true">
      <div>{words.map((word, index) => <span key={index}>{word}<i>·</i></span>)}</div>
    </div>
    <div className="bh-footer-grid">
      <div className="footer-brand">
        <p className="bh-footer-kicker">Keep wandering</p>
        <Link to="/explore" className="bh-footer-cta">Every state has<br /><em>another story.</em> <span aria-hidden="true">↗</span></Link>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <Link to="/">Home</Link>
        <Link to="/explore">The collections</Link>
        <Link to="/explore?category=heritage">Heritage</Link>
        <Link to="/explore?category=festivals">Festivals</Link>
        <Link to="/ai-guide">Bharat AI</Link>
      </nav>
    </div>
    <div className="bh-footer-word" aria-hidden="true">Bharat</div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Incredible Bharat</span><span>Many worlds. One Bharat.</span></div>
  </footer>;
}
