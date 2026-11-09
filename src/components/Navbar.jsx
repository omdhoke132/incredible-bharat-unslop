import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/explore", label: "Explore India" },
  { section: "state-explorer", label: "States" },
  { to: "/ai-guide", label: "Bharat AI" }
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === "/";

  // Tuck the bar away while reading downward, bring it back on any upward scroll.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 24);
      setHidden(current > 320 && current > last + 4);
      if (current < last - 4 || current < 320) setHidden(false);
      last = current;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  const goToSection = (section) => {
    setMobileOpen(false);
    if (isHome) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    navigate("/");
    window.setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 700);
  };

  const linkClass = ({ isActive }) => isActive ? "active" : "";
  const closeMenu = () => setMobileOpen(false);

  const renderLinks = (mobile) => links.map((link, index) => {
    const content = <><span className="nav-index">0{index + 1}</span><span className="nav-label" data-text={link.label}>{link.label}</span></>;
    const style = mobile ? { "--i": index } : undefined;
    return link.section
      ? <button key={link.label} type="button" className="nav-section-link" style={style} onClick={() => goToSection(link.section)}>{content}</button>
      : <NavLink key={link.label} to={link.to} end={link.end} className={linkClass} style={style} onClick={closeMenu}>{content}</NavLink>;
  });

  return (
    <nav
      className={`navbar${scrolled ? " is-scrolled" : ""}${hidden && !mobileOpen ? " is-hidden" : ""}`}
      aria-label="Main navigation"
    >
      <Link to="/" className="logo" aria-label="Incredible Bharat home" onClick={closeMenu}>
        <svg className="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="17" />
          <circle cx="20" cy="20" r="3.2" />
          {Array.from({ length: 12 }, (_, index) => (
            <line key={index} x1="20" y1="20" x2="20" y2="4" transform={`rotate(${index * 30} 20 20)`} />
          ))}
        </svg>
        <div className="logo-copy">
          <strong>Incredible <em>Bharat</em></strong>
          <small>A living cultural atlas</small>
        </div>
      </Link>

      <div className="nav-links">{renderLinks(false)}</div>

      <Link to="/explore" className="nav-cta" onClick={closeMenu}>
        <span>Explore the atlas</span> <span aria-hidden="true">→</span>
      </Link>

      <button
        type="button"
        className={`mobile-menu-toggle${mobileOpen ? " is-open" : ""}`}
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMobileOpen((open) => !open)}
      >
        <span></span><span></span><span></span>
      </button>

      {mobileOpen && (
        <div className="mobile-nav-panel" id="mobile-navigation">
          {renderLinks(true)}
          <span className="mobile-nav-mark" aria-hidden="true">भारत</span>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
