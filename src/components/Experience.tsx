"use client";

import { useEffect, useRef, useState } from "react";
import data from "@/data/portfolioData.json";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeDots, setActiveDots] = useState<boolean[]>([]);
  const [indicatorOpacity, setIndicatorOpacity] = useState(1);

  useEffect(() => {
    let requestRef = 0;

    const updateProgress = () => {
      if (!containerRef.current) return;

      const firstDot = containerRef.current.querySelector('[data-timeline-dot="0"]');
      const lastDot = containerRef.current.querySelector(`[data-timeline-dot="${data.experience.length - 1}"]`);

      if (!firstDot || !lastDot) return;

      const firstDotRect = firstDot.getBoundingClientRect();
      const lastDotRect = lastDot.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const startY = firstDotRect.top + firstDotRect.height / 2;
      const lastDotY = lastDotRect.top + lastDotRect.height / 2;
      const endY = containerRect.bottom;

      const totalDistance = endY - startY;
      const lastDotDistance = lastDotY - startY;
      const windowHeight = window.innerHeight;

      // The scroll trigger point: 55% of the viewport height
      const triggerPoint = windowHeight * 0.55;
      const scrolled = triggerPoint - startY;

      let pct = scrolled / totalDistance;
      pct = Math.max(0, Math.min(1, pct));

      const currentHeight = pct * totalDistance;
      let opacity = 1;
      if (currentHeight > lastDotDistance) {
        opacity = 1 - (currentHeight - lastDotDistance) / (totalDistance - lastDotDistance || 1);
        opacity = Math.max(0, Math.min(1, opacity));
      }

      setProgress(pct);
      setLineHeight(totalDistance);
      setIndicatorOpacity(opacity);

      const dots = containerRef.current.querySelectorAll('[data-timeline-dot]');
      const activeArray = Array.from(dots).map((dot) => {
        const rect = dot.getBoundingClientRect();
        // Light up if the trigger point has crossed the center of the dot
        return rect.top + rect.height / 2 <= triggerPoint;
      });
      setActiveDots(activeArray);
    };

    const handleScroll = () => {
      cancelAnimationFrame(requestRef);
      requestRef = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Initial calculation
    updateProgress();

    // Small delay to ensure layout has fully settled
    const timer = setTimeout(updateProgress, 100);

    return () => {
      cancelAnimationFrame(requestRef);
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section id="experience" className="bg-transparent py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">Career</p>
        <h2 className="mb-16 text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
          Experience
        </h2>

        <div ref={containerRef} className="relative space-y-0">
          {/* Background tracker line */}
          <div
            className="absolute left-[14px] top-[17px] bottom-0 w-px bg-[var(--color-border)]"
          />

          {/* Active progress indicator line */}
          <div
            className="absolute left-[14px] top-[17px] w-[2px] bg-[var(--color-accent)]"
            style={{ height: `${progress * lineHeight}px` }}
          >
            {/* Glowing moving circle */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 h-4 w-4 -mb-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)] flex items-center justify-center transition-opacity duration-150"
              style={{ opacity: indicatorOpacity }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
            </div>
          </div>

          {data.experience.map((exp, idx) => {
            const isActive = activeDots[idx];

            return (
              <div key={exp.id} className="relative pl-12 pb-12 last:pb-0">
                {/* Timeline dot — dynamic */}
                <div
                  data-timeline-dot={idx}
                  className={`absolute left-0 top-2 h-[30px] w-[30px] rounded-full border-2 transition-all duration-300 flex items-center justify-center ${isActive
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/20 scale-105 shadow-[0_0_8px_var(--color-accent)]"
                    : "border-[var(--color-border)] bg-[var(--color-bg-card)]"
                    }`}
                >
                  <div className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${isActive ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"
                    }`} />
                </div>

                <div className={`rounded-xl border transition-all duration-300 p-6 sm:p-8 ${isActive
                  ? "border-[var(--color-accent)]/30 shadow-[var(--shadow-accent)] bg-[var(--color-bg-card)]/50"
                  : "border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent)]/30 hover:shadow-[var(--shadow-accent)]"
                  }`}>
                  {/* Header */}
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{exp.role}</h3>
                      <p className="mt-1 flex flex-col sm:flex-row sm:items-center text-sm text-[var(--color-text-secondary)]">
                        <span>{exp.company}</span>
                        <span className="hidden sm:inline mx-2 text-[var(--color-text-muted)]">·</span>
                        <span className="mt-1 sm:mt-0 flex items-center">
                          <span>{exp.type}</span>
                          <span className="mx-2 text-[var(--color-text-muted)]">·</span>
                          <span>{exp.location}</span>
                        </span>
                      </p>
                    </div>
                    <span className="shrink-0 self-start rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>

                  {/* Inline metrics */}
                  <div className="mb-5 flex flex-wrap gap-3">
                    {exp.metrics.map((m) => (
                      <div key={m.label} className="rounded-lg bg-[var(--color-bg-elevated)] px-3 py-1.5 text-center">
                        <span className="text-sm font-bold text-[var(--color-accent)]">{m.value}</span>
                        <span className="ml-1.5 text-xs text-[var(--color-text-muted)]">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bullets */}
                  <ul className="mb-5 space-y-3">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <span key={t} className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-muted)] transition-all duration-200 cursor-default hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
