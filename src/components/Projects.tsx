"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { plural, site } from "@/lib/site";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { Section, cx } from "./ui";

const projects = site.projects;

export default function Projects() {
  const {
    index,
    setIndex,
    autoplay,
    userPaused,
    reduced,
    toggleUserPaused,
    containerProps,
    progressProps,
  } = useAutoAdvance(projects.length);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the active item visible inside the list's own scroller (horizontal on
  // phones, vertical never needed) without scrolling the page.
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[index];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const left = tab.offsetLeft - list.offsetLeft;
    if (
      left < list.scrollLeft ||
      left + tab.offsetWidth > list.scrollLeft + list.clientWidth
    ) {
      list.scrollTo({ left: left - 8, behavior: "smooth" });
    }
  }, [index]);

  function onKeyDown(e: React.KeyboardEvent) {
    const step = ["ArrowDown", "ArrowRight"].includes(e.key)
      ? 1
      : ["ArrowUp", "ArrowLeft"].includes(e.key)
        ? -1
        : 0;
    const to =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? projects.length - 1
          : step
            ? (index + step + projects.length) % projects.length
            : -1;
    if (to < 0) return;
    e.preventDefault();
    setIndex(to);
    tabRefs.current[to]?.focus();
  }

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects"
      intro={`${plural(projects.length, "project")}, from internal platforms built at Finomics to AWS, AI, and data engineering work.`}
    >
      <div
        {...containerProps}
        style={{ "--progress-ms": "4000ms" } as React.CSSProperties}
        data-reveal
        className="grid gap-5 lg:grid-cols-12 lg:gap-8"
      >
        {/* Project list */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="font-mono text-micro font-medium uppercase text-fg-subtle">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </p>
            {!reduced && (
              <button
                type="button"
                onClick={toggleUserPaused}
                aria-label={
                  userPaused ? "Play project tour" : "Pause project tour"
                }
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 font-mono text-xs text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
              >
                {userPaused ? (
                  <Play className="h-3.5 w-3.5" aria-hidden />
                ) : (
                  <Pause className="h-3.5 w-3.5" aria-hidden />
                )}
                {userPaused ? "Play" : "Pause"}
              </button>
            )}
          </div>
          <div
            ref={listRef}
            role="tablist"
            aria-label="Projects"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
          >
            {projects.map((proj, i) => {
              const on = i === index;
              return (
                <button
                  key={proj.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${proj.id}`}
                  aria-selected={on}
                  aria-controls="project-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setIndex(i)}
                  className={cx(
                    "relative w-56 shrink-0 overflow-hidden rounded-xl border px-4 py-3 text-left transition-[background-color,border-color,box-shadow] duration-200 lg:w-full",
                    on
                      ? "border-border-strong bg-surface shadow-md"
                      : "border-border bg-surface/50 hover:border-border-strong hover:bg-surface lg:border-transparent lg:bg-transparent",
                  )}
                >
                  <span
                    aria-hidden
                    className={cx(
                      "absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-accent-solid to-accent-2 transition-opacity",
                      on ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="flex items-baseline justify-between gap-3">
                    <span
                      className={cx(
                        "truncate font-display text-[0.95rem] font-semibold",
                        on ? "text-fg" : "text-fg-muted",
                      )}
                    >
                      {proj.shortTitle}
                    </span>
                    <span className="shrink-0 font-mono text-[0.7rem] text-fg-subtle">
                      {proj.dates.split(" – ").pop()}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-fg-subtle">
                    {proj.subtitle}
                  </span>
                  {on && autoplay && (
                    <span
                      aria-hidden
                      className="absolute inset-x-4 bottom-1.5 h-[2px] overflow-hidden rounded-full bg-[rgb(var(--accent-solid-rgb)/0.12)]"
                    >
                      <span
                        key={progressProps.key}
                        className={cx(
                          "block h-full w-full bg-gradient-to-r from-accent-solid to-accent-2",
                          progressProps.className,
                        )}
                        onAnimationEnd={
                          "onAnimationEnd" in progressProps
                            ? progressProps.onAnimationEnd
                            : undefined
                        }
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project detail */}
        <article
          id="project-panel"
          role="tabpanel"
          aria-labelledby={`tab-${projects[index].id}`}
          aria-live={autoplay ? "off" : "polite"}
          className="hud relative min-w-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-md lg:col-span-8"
        >
          {/* All panels share one grid cell, so the box keeps the tallest height and
              the page below never jumps as the tour advances. */}
          <div className="grid">
            {projects.map((p) => {
              const on = p.id === projects[index].id;
              return (
                <div
                  key={p.id}
                  aria-hidden={!on}
                  className={cx(
                    "flex flex-col [grid-area:1/1]",
                    on
                      ? "visible animate-[panel-in_260ms_var(--ease-out-soft)]"
                      : "invisible",
                  )}
                >
                  <header className="border-b border-border p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs">
                      <span className="font-medium uppercase tracking-[0.14em] text-accent">
                        {p.subtitle}
                      </span>
                      <span aria-hidden className="text-fg-subtle">
                        ·
                      </span>
                      <span className="text-fg-subtle">{p.dates}</span>
                      {p.association && (
                        <>
                          <span aria-hidden className="text-fg-subtle">
                            ·
                          </span>
                          <span className="text-fg-subtle">
                            {p.association}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-[clamp(1.3rem,1.1rem+0.8vw,1.75rem)] font-semibold leading-snug tracking-tight text-fg">
                      {p.title}
                    </h3>
                  </header>

                  {p.result && (
                    <div className="border-b border-border bg-accent-soft/60 px-6 py-4 sm:px-8">
                      <p className="font-mono text-micro font-medium uppercase text-accent">
                        Result
                      </p>
                      <p className="mt-1.5 text-[0.95rem] font-medium leading-relaxed text-fg">
                        {p.result}
                      </p>
                    </div>
                  )}

                  <ol className="space-y-3.5 p-6 sm:p-8">
                    {p.bullets.map((b, i) => (
                      <li
                        key={b}
                        className="grid grid-cols-[2rem_1fr] gap-2 text-[0.95rem] leading-relaxed text-fg-muted"
                      >
                        <span
                          aria-hidden
                          className="pt-[0.2rem] font-mono text-xs text-accent"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="max-w-[75ch]">{b}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-auto border-t border-border bg-bg-subtle px-6 py-4 sm:px-8">
                    <p className="sr-only">Stack</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-fg-muted"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </Section>
  );
}
