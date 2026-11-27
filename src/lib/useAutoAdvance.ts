"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * Shared engine for auto-advancing showcases.
 *
 * Timing is driven by the CSS progress bar itself: when its animation ends we
 * advance. Pausing just sets `animation-play-state: paused`, so resuming
 * continues from exactly where the bar stopped.
 *
 * Pauses while: hovered, keyboard focus is inside, off-screen, or the visitor
 * pressed pause. Never autoplays under prefers-reduced-motion.
 */
export function useAutoAdvance(count: number) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplay = !reduced && !userPaused;
  const paused = !autoplay || hovered || focused || !inView;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  const containerProps = {
    ref,
    "data-paused": paused ? "true" : "false",
    // Mouse only: on touch screens a tap would otherwise leave it "hovered" forever.
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && setHovered(true),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType === "mouse" && setHovered(false),
    onFocus: (e: React.FocusEvent<HTMLDivElement>) => {
      // Only keyboard focus pauses; a mouse click on a tab shouldn't freeze the tour.
      if ((e.target as HTMLElement).matches(":focus-visible")) setFocused(true);
    },
    onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
    },
  };

  /** Props for the active tab's progress bar. */
  const progressProps = autoplay
    ? { className: "progress-run", onAnimationEnd: next, key: `run-${index}` }
    : { className: "", key: `static-${index}` };

  return {
    index,
    setIndex,
    paused,
    autoplay,
    userPaused,
    reduced,
    toggleUserPaused: () => setUserPaused((p) => !p),
    pause: () => setUserPaused(true),
    containerProps,
    progressProps,
  };
}
