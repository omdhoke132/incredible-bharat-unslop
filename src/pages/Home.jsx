import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  getAllArts,
  getAllCrafts,
  getAllFestivals,
  getAllStates,
  getCultureByState,
  getCultureStats,
  getUNESCOHeritage
} from "../services/cultureService";

const chapters = [
  { key: "heritage", number: "01", title: "Written in stone", text: "Forts, temples and ancient cities. Follow the architecture of a civilization.", label: "Heritage & monuments", glyph: "arch" },
  { key: "festivals", number: "02", title: "Lit up in colour", text: "Harvests, processions and nights of lamps that bring whole regions to the street.", label: "Festivals", glyph: "diya" },
  { key: "arts", number: "03", title: "Made by hand", text: "Paintings, crafts and textiles that carry a region's identity across generations.", label: "Arts & craftsmanship", glyph: "lotus" },
  { key: "cuisine", number: "04", title: "A taste of belonging", text: "Regional kitchens, local ingredients and stories served at the table.", label: "Food & culture", glyph: "sun" }
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- small motion primitives ---------- */

function useInView(options = { threshold: 0.3 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(element);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
}

function CountUp({ value, duration = 1600 }) {
  const [ref, inView] = useInView({ threshold: 0.6 });
  const reducedMotion = prefersReducedMotion();
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView || reducedMotion) return undefined;
    let frame = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(value * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reducedMotion]);
  return <span ref={ref}>{reducedMotion ? value : display}</span>;
}

/* ---------- ornaments ---------- */

function Glyph({ type }) {
  const paths = {
    arch: <path d="M8 56V30C8 17 18 8 32 8s24 9 24 22v26M18 56V32c0-8 6-14 14-14s14 6 14 14v24M4 56h56" />,
    diya: <><path d="M6 36h52c-3 12-13 18-26 18S9 48 6 36Z" /><path className="flame" d="M32 30c-6-6-4-14 0-22 4 8 6 16 0 22Z" /></>,
    lotus: <path d="M32 54C18 46 14 34 16 20c8 4 14 12 16 22 2-10 8-18 16-22 2 14-2 26-16 34ZM32 54C26 42 26 26 32 10c6 16 6 32 0 44ZM6 40c6 10 16 14 26 14M58 40c-6 10-16 14-26 14" />,
    sun: <><circle cx="32" cy="32" r="11" />{Array.from({ length: 12 }, (_, i) => <line key={i} x1="32" y1="6" x2="32" y2="14" transform={`rotate(${i * 30} 32 32)`} />)}</>
  };
  return <svg className="glyph" viewBox="0 0 64 64" aria-hidden="true">{paths[type]}</svg>;
}

/* ---------- sections ---------- */

function HeritageRail({ sites }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;
    const desktop = window.matchMedia("(min-width: 860px)");
    let frame = 0;

    const measure = () => {
      if (!desktop.matches || prefersReducedMotion()) {
        setHeight(null);
        track.style.transform = "";
        return;
      }
      const distance = track.scrollWidth - window.innerWidth;
      setHeight(window.innerHeight + Math.max(0, distance));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!desktop.matches || prefersReducedMotion()) return;
        const rect = section.getBoundingClientRect();
        const travel = rect.height - window.innerHeight;
        const progress = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
        const distance = track.scrollWidth - window.innerWidth;
        track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
        section.style.setProperty("--rail", progress.toFixed(4));
      });
    };

    measure();
    onScroll();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sites.length]);

  return (
    <section className="bh-rail" ref={sectionRef} style={height ? { height } : undefined} id="heritage">
      <div className="bh-rail-sticky">
        <div className="bh-rail-track" ref={trackRef}>
          <div className="bh-rail-intro">
            <p className="bh-kicker">World heritage · {sites.length} stops</p>
            <h2>Walk through<br /><em>a thousand years.</em></h2>
            <p>Keep scrolling. The monuments come to you, from rock-cut caves to desert forts.</p>
            <div className="bh-rail-progress" aria-hidden="true"><span /></div>
          </div>
          {sites.map((site, index) => (
            <Link key={`${site.stateId}-${site.id}`} to={`/heritage/${encodeURIComponent(site.id)}`} className="bh-rail-card">
              <span className="bh-rail-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="bh-rail-arch" aria-hidden="true"><Glyph type="arch" /></div>
              <small>{site.state}{site.period ? ` · ${site.period}` : ""}</small>
              <h3>{site.name}</h3>
              <p>{site.description}</p>
              <span className="bh-rail-link">Read the story <span aria-hidden="true">→</span></span>
            </Link>
          ))}
          <Link to="/explore?category=heritage" className="bh-rail-end">
            <span>See every<br />monument</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function StateAtlas({ states }) {
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const [active, setActive] = useState(null);

  const details = useMemo(() => Object.fromEntries(states.map((state) => {
    const culture = getCultureByState(state.id);
    return [state.id, {
      heritage: culture?.heritage?.length || 0,
      festivals: culture?.festivals?.length || 0,
      crafts: (culture?.arts?.length || 0) + (culture?.crafts?.length || 0) + (culture?.textiles?.length || 0)
    }];
  })), [states]);

  const onMove = (event) => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    const rect = list.getBoundingClientRect();
    preview.style.transform = `translate3d(${event.clientX - rect.left + 28}px, ${event.clientY - rect.top - 90}px, 0)`;
  };

  const activeState = states.find((state) => state.id === active);

  return (
    <section className="bh-states" id="state-explorer">
      <div className="bh-states-head" data-reveal>
        <p className="bh-kicker">A different story at every turn</p>
        <h2>Let the place<br /><em>lead the way.</em></h2>
        <p>{states.length} states, each with its own heritage, festivals and crafts. Hover to preview, click to step inside.</p>
      </div>
      <div className="bh-state-list" ref={listRef} onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
        {states.map((state, index) => (
          <Link
            key={state.id}
            to={`/explore?state=${encodeURIComponent(state.id)}`}
            className={active === state.id ? "is-active" : ""}
            onPointerEnter={() => setActive(state.id)}
            onFocus={() => setActive(state.id)}
            onBlur={() => setActive(null)}
            data-reveal
          >
            <span className="bh-state-num">{String(index + 1).padStart(2, "0")}</span>
            <h3><span data-text={state.name}>{state.name}</span></h3>
            <small>{state.region}</small>
            <span className="bh-state-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
        <div className={`bh-state-preview${activeState ? " is-visible" : ""}`} ref={previewRef} aria-hidden="true">
          {activeState && (
            <div key={activeState.id}>
              <small>{activeState.region}</small>
              <strong>{activeState.name}</strong>
              <p>{activeState.description}</p>
              <dl>
                <div><dt>Heritage</dt><dd>{details[activeState.id].heritage}</dd></div>
                <div><dt>Festivals</dt><dd>{details[activeState.id].festivals}</dd></div>
                <div><dt>Arts &amp; crafts</dt><dd>{details[activeState.id].crafts}</dd></div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- page ---------- */

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const stats = getCultureStats();
  const states = getAllStates();

  const marqueeTop = useMemo(() => getAllFestivals().map((item) => item.name).slice(0, 18), []);
  const marqueeBottom = useMemo(() => [...getAllArts(), ...getAllCrafts()].map((item) => item.name).slice(0, 18), []);

  // One World Heritage site per state first, so the rail travels across the country.
  const railSites = useMemo(() => {
    const byState = new Map();
    getUNESCOHeritage().forEach((site) => {
      if (!byState.has(site.stateId)) byState.set(site.stateId, []);
      byState.get(site.stateId).push(site);
    });
    const picked = [];
    for (let round = 0; picked.length < 10 && round < 4; round += 1) {
      byState.forEach((sites) => {
        if (sites[round] && picked.length < 10) picked.push(sites[round]);
      });
    }
    return picked;
  }, []);

  function search(event) {
    event.preventDefault();
    navigate(`/explore${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  }

  const statItems = [
    [stats.states, "curated states"],
    [stats.heritageSites, "heritage sites"],
    [stats.festivals, "festivals"],
    [stats.arts + stats.crafts + stats.textiles, "arts, crafts & textiles"]
  ];

  return <>
    <Navbar />
    <main className="bh-home">
      <section className="bh-hero">
        <div className="bh-hero-bg" aria-hidden="true">
          <span className="bh-hero-devanagari">भारत</span>
        </div>

        <div className="bh-hero-copy">
          <p className="bh-kicker">Many worlds, one Bharat</p>
          <h1>
            <span className="bh-line">Heritage you can</span>
            <span className="bh-line accent">wander through.</span>
          </h1>
          <p className="bh-deck">
            Monuments, festivals, crafts, music and kitchens from {stats.states} states, gathered into one living atlas you can wander through.
          </p>
          <form className="bh-search" onSubmit={search} role="search">
            <label htmlFor="home-search" className="sr-only">Search the atlas</label>
            <svg className="bh-search-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input id="home-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Hampi, Bihu, Pattachitra…" />
            <button type="submit"><span>Explore</span><span aria-hidden="true">→</span></button>
          </form>
          <div className="bh-hero-actions">
            <Link to="/explore" className="bh-btn">Open the atlas <span aria-hidden="true">↗</span></Link>
            <Link to="/ai-guide" className="bh-btn bh-btn-ghost">Ask Bharat AI</Link>
          </div>
        </div>

        <div className="bh-hero-visual">
          <img className="bh-hero-image" src="/images/hero/hampi-dawn.webp" alt="The stone chariot of Hampi at dawn, among granite boulders" />
        </div>
      </section>

      <section className="bh-marquee" id="marquee" aria-label="A few of the festivals, arts and crafts in the collection">
        <div className="bh-marquee-row">
          <div>{marqueeTop.map((name, index) => <span key={index}>{name}<i aria-hidden="true">·</i></span>)}</div>
        </div>
        <div className="bh-marquee-row reverse">
          <div>{marqueeBottom.map((name, index) => <span key={index}>{name}<i aria-hidden="true">·</i></span>)}</div>
        </div>
      </section>

      <section className="bh-stats" aria-label="About the collection">
        {statItems.map(([value, label], index) => (
          <div key={label} data-reveal style={{ "--stagger": `${index * 90}ms` }}>
            <strong><CountUp value={value} /></strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="bh-chapters-section">
        <div className="bh-section-head" data-reveal>
          <p className="bh-kicker">Follow your curiosity</p>
          <h2>One country.<br /><em>Countless ways in.</em></h2>
        </div>
        <div className="bh-chapters">
          {chapters.map((chapter, index) => (
            <Link key={chapter.key} to={`/explore?category=${chapter.key}`} className="bh-chapter" data-reveal style={{ "--stagger": `${index * 110}ms` }}>
              <div className="bh-chapter-inner">
                <div className="bh-chapter-top"><span>{chapter.number}</span><Glyph type={chapter.glyph} /></div>
                <small>{chapter.label}</small>
                <h3>{chapter.title}</h3>
                <p>{chapter.text}</p>
                <span className="bh-chapter-go" aria-hidden="true">↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <HeritageRail sites={railSites} />

      <StateAtlas states={states} />

      <section className="bh-guide">
        <div className="bh-guide-copy" data-reveal>
          <p className="bh-kicker">Keep the conversation going</p>
          <h2>Every discovery starts<br />with <em>a question.</em></h2>
          <div className="bh-guide-prompt">
            <span className="bh-guide-quote" aria-hidden="true">“</span>
            <p className="typewriter">What makes the living traditions of Rajasthan so distinctive?</p>
          </div>
          <Link to="/ai-guide" className="bh-btn">Meet Bharat AI <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
