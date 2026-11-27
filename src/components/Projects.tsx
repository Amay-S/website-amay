"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { Section, cx } from "./ui";

const projects = site.projects;

export default function Projects() {
  const { index, setIndex, autoplay, userPaused, reduced, toggleUserPaused, containerProps, progressProps } =
    useAutoAdvance(projects.length);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const p = projects[index];

  // Keep the active pill visible in the horizontally scrolling tab bar (no page scroll).
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[index];
    if (!list || !tab) return;
    const left = tab.offsetLeft - list.offsetLeft;
    if (left < list.scrollLeft || left + tab.offsetWidth > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: left - 8, behavior: "smooth" });
    }
  }, [index]);

  function onKeyDown(e: React.KeyboardEvent) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const to = e.key === "Home" ? 0 : e.key === "End" ? projects.length - 1 : (index + dir + projects.length) % projects.length;
    if (!dir && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    setIndex(to);
    tabRefs.current[to]?.focus();
  }

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects"
      intro="Hands-on builds across AWS, generative AI, big data, and machine learning."
    >
      <div {...containerProps} style={{ "--progress-ms": "4000ms" } as React.CSSProperties} data-reveal>
        {/* Tabs + pause */}
        <div className="flex items-center gap-3">
          <div
            ref={listRef}
            role="tablist"
            aria-label="Projects"
            onKeyDown={onKeyDown}
            className="flex min-w-0 flex-1 gap-1 overflow-x-auto rounded-2xl border border-border bg-surface p-1 shadow-sm [scrollbar-width:none]"
          >
            {projects.map((proj, i) => {
              const active = i === index;
              return (
                <button
                  key={proj.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${proj.id}`}
                  aria-selected={active}
                  aria-controls="project-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setIndex(i)}
                  className={cx(
                    "relative shrink-0 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
                    active ? "bg-accent-soft text-accent" : "text-fg-muted hover:bg-surface-2 hover:text-fg",
                  )}
                >
                  <span className="mr-2 font-mono text-[0.7rem] opacity-70">{String(i + 1).padStart(2, "0")}</span>
                  {proj.shortTitle}
                  {active && autoplay && (
                    <span aria-hidden className="absolute inset-x-3 bottom-1 h-[2px] overflow-hidden rounded-full bg-[rgb(var(--accent-solid-rgb)/0.15)]">
                      <span
                        key={progressProps.key}
                        className={cx("block h-full w-full bg-accent-solid", progressProps.className)}
                        onAnimationEnd={"onAnimationEnd" in progressProps ? progressProps.onAnimationEnd : undefined}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {!reduced && (
            <button
              type="button"
              onClick={toggleUserPaused}
              aria-label={userPaused ? "Play project tour" : "Pause project tour"}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-surface text-fg-muted shadow-sm transition-colors hover:border-border-strong hover:text-fg"
            >
              {userPaused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
            </button>
          )}
        </div>

        {/* Panel */}
        <div
          id="project-panel"
          role="tabpanel"
          aria-labelledby={`tab-${p.id}`}
          aria-live={autoplay ? "off" : "polite"}
          className="mt-5 grid overflow-hidden rounded-2xl border border-border bg-surface shadow-md lg:grid-cols-12"
        >
          <div key={p.id} className="animate-[panel-in_320ms_var(--ease-out-soft)] p-6 sm:p-9 lg:col-span-8">
            <p className="font-mono text-micro font-medium uppercase text-accent">{p.subtitle}</p>
            <h3 className="mt-3 font-display text-[clamp(1.4rem,1.15rem+1vw,2rem)] font-semibold leading-tight tracking-tight text-fg">
              {p.title}
            </h3>
            <ul className="mt-6 space-y-3.5">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[0.95rem] leading-relaxed text-fg-muted">
                  <span aria-hidden className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span className="max-w-[72ch]">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack as a little pipeline */}
          <aside
            aria-label="Stack"
            className="relative border-t border-border bg-bg-subtle p-6 sm:p-9 lg:col-span-4 lg:border-t-0 lg:border-l"
          >
            <p className="font-mono text-micro font-medium uppercase text-fg-subtle">Stack</p>
            <ol key={p.id} className="relative mt-5 space-y-2.5">
              <span aria-hidden className="absolute left-[11px] top-3 bottom-3 w-px bg-border-strong" />
              {p.tags.map((t, i) => (
                <li
                  key={t}
                  className="relative flex animate-[panel-in_320ms_var(--ease-out-soft)_both] items-center gap-3"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span aria-hidden className="grid h-[23px] w-[23px] shrink-0 place-items-center rounded-full border border-border-strong bg-surface">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-accent-solid to-accent-2" />
                  </span>
                  <span className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-fg">{t}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 font-mono text-xs text-fg-subtle">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </p>
          </aside>
        </div>
      </div>
    </Section>
  );
}
