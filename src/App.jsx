import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import "./bharat.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MotionLayer from "./components/MotionLayer";

const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const HeritageDetail = lazy(() => import("./pages/HeritageDetail"));
const CulturalDetail = lazy(() => import("./pages/CulturalDetail"));
const AIGuide = lazy(() => import("./pages/AIGuide"));

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <svg className="loader-chakra" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="44" />
        <circle cx="50" cy="50" r="8" />
        {Array.from({ length: 24 }, (_, index) => (
          <line key={index} x1="50" y1="50" x2="50" y2="7" transform={`rotate(${index * 15} 50 50)`} />
        ))}
      </svg>
      <p>Lighting the lamps…</p>
    </div>
  );
}

function NotFound() {
  return (
    <>
      <Navbar />
      <main className="page-container not-found-page">
        <p className="eyebrow">404 · NOT FOUND</p>
        <h1>This story isn't in our collection yet.</h1>
        <p>Try another search or return to the cultural atlas.</p>
        <Link to="/explore" className="primary-btn">Explore Incredible Bharat →</Link>
      </main>
      <Footer />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <MotionLayer />
      {/* Re-keying on the path replays the page entrance on every navigation. */}
      <div className="route-stage" key={location.pathname}>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/heritage/:id" element={<HeritageDetail />} />
            <Route path="/culture/:category/:stateId/:id" element={<CulturalDetail />} />
            <Route path="/ai-guide" element={<AIGuide />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
