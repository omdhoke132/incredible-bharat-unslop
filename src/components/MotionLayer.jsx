import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Elements on inner pages that animate in without needing markup changes.
const AUTO_REVEAL = [
  ".explore-toolbar", ".results-header", ".explore-result-heading",
  ".culture-card", ".heritage-card", ".empty-state",
  ".heritage-detail-hero", ".heritage-detail-body > *", ".heritage-sources", ".heritage-related-card",
  ".culture-detail-hero", ".culture-detail-grid > *", ".culture-reference-section",
  ".ai-guide-panel", ".ai-discover-card", ".ai-source-panel",
  "[data-reveal]"
].join(",");

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function MotionLayer() {
  const { pathname } = useLocation();

  // Scroll to top on route change so every page starts with its entrance.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Reveal-on-scroll for everything matching AUTO_REVEAL, including content
  // that mounts later (filter changes, lazy routes).
  useEffect(() => {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    const register = (root) => {
      root.querySelectorAll?.(AUTO_REVEAL).forEach((element) => {
        if (element.dataset.motion) return;
        element.dataset.motion = "1";
        // Stagger siblings inside the same grid.
        const index = Array.prototype.indexOf.call(element.parentElement?.children || [], element);
        element.style.setProperty("--stagger", `${Math.min(index % 6, 5) * 70}ms`);
        element.classList.add("motion-reveal");
        observer.observe(element);
      });
    };

    register(document.body);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          register(node.parentElement || node);
        }
      }));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  // No rendered output: this layer only observes and reveals.
  return null;
}
