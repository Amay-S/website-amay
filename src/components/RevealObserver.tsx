"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __revealBooted?: boolean;
  }
}

/**
 * Fades-and-rises every [data-reveal] element once, the first time it enters
 * the viewport. Only active when the boot script added `.reveal-ready`
 * (i.e. motion is allowed); otherwise everything is simply visible.
 */
export default function RevealObserver() {
  useEffect(() => {
    window.__revealBooted = true;
    const root = document.documentElement;
    if (!root.classList.contains("reveal-ready")) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.revealed = "true";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observeAll = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])").forEach((el) => io.observe(el));
    observeAll();

    // Pick up elements rendered later (e.g. expanded lists)
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
