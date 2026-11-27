"use client";

import { ChevronDown, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { plural, site } from "@/lib/site";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { Console, Section, Signal, cx } from "./ui";

const projects = site.projects;
/** Bullets shown before "Show all": keeps every panel a similar, full height. */
const CAP = 4;

export default function Projects() {
  const { index, setIndex, autoplay, userPaused, reduced, toggleUserPaused, pause, containerProps, progressProps } =
    useAutoAdvance(projects.length);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const active = projects[index];

  // Keep the active item visible in the phone-width horizontal list (no page scroll).
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[index];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const left = tab.offsetLeft - list.offsetLeft;
    if (left < list.scrollLeft || left + tab.offsetWidth > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: left - 8, behavior: "smooth" });
    }
  }, [index]);

  function onKeyDown(e: React.KeyboardEvent) {
    const step = ["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : ["ArrowUp", "ArrowLeft"].includes(e.key) ? -1 : 0;
    const to =
      e.key === "Home" ? 0 : e.key === "End" ? projects.length - 1 : step ? (index + step + projects.length) % projects.length : -1;
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
      <div {...containerProps} style={{ "--progress-ms": "4000ms" } as React.CSSProperties} data-reveal>
        <Console
          title={`Projects · ${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`}
          meta={
            reduced ? (
              <Signal>{projects.length} builds</Signal>
            ) : (
              <button
                type="button"
                onClick={toggleUserPaused}
                aria-label={userPaused ? "Play project tour" : "Pause project tour"}
                className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-fg-muted transition-colors hover:text-fg"
              >
                {userPaused ? <Play className="h-3 w-3" aria-hidden /> : <Pause className="h-3 w-3" aria-hidden />}
                {userPaused ? "Play" : "Auto-tour"}
              </button>
            )
          }
          bodyClassName="grid lg:grid-cols-[17rem_1fr]"
        >
          {/* Project list */}
          <div
            ref={listRef}
            role="tablist"
            aria-label="Projects"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex min-w-0 gap-1.5 overflow-x-auto border-b border-border p-2.5 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r"
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
                    "relative w-52 shrink-0 overflow-hidden rounded-xl border px-3.5 py-2.5 text-left transition-colors lg:w-full",
                    on ? "border-[rgb(var(--accent-solid-rgb)/0.45)] bg-accent-soft" : "border-transparent hover:bg-surface-2",
                  )}
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className={cx("truncate text-sm font-semibold", on ? "text-fg" : "text-fg-muted")}>{proj.shortTitle}</span>
                    <span className="shrink-0 font-mono text-[0.65rem] text-fg-subtle">{proj.dates.split(" – ").pop()}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-fg-subtle">{proj.subtitle}</span>
                  {on && autoplay && (
                    <span aria-hidden className="absolute inset-x-3.5 bottom-1 h-[2px] overflow-hidden rounded-full bg-[rgb(var(--accent-solid-rgb)/0.15)]">
                      <span
                        key={progressProps.key}
                        className={cx("block h-full w-full bg-gradient-to-r from-accent-solid to-accent-2", progressProps.className)}
                        onAnimationEnd={"onAnimationEnd" in progressProps ? progressProps.onAnimationEnd : undefined}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Detail: every panel shares one grid cell so the box never jumps */}
          <div
            id="project-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            aria-live={autoplay ? "off" : "polite"}
            className="grid min-w-0"
          >
            {projects.map((p) => {
              const on = p.id === active.id;
              const open = !!expanded[p.id];
              const shown = open ? p.bullets : p.bullets.slice(0, CAP);
              const hidden = p.bullets.length - CAP;
              return (
                <div
                  key={p.id}
                  aria-hidden={!on}
                  className={cx(
                    "grid content-start [grid-area:1/1] md:grid-cols-[1fr_16rem]",
                    on ? "visible animate-[panel-in_260ms_var(--ease-out-soft)]" : "invisible",
                  )}
                >
                  <header className="border-b border-border p-5 sm:p-7 md:col-span-2">
                    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
                      <span className="font-medium text-accent">{p.subtitle}</span>
                      <span aria-hidden className="text-fg-subtle">/</span>
                      <span className="text-fg-subtle">{p.dates}</span>
                      {p.association && (
                        <>
                          <span aria-hidden className="text-fg-subtle">/</span>
                          <span className="text-fg-subtle">{p.association}</span>
                        </>
                      )}
                    </p>
                    <h3 className="mt-2.5 font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.65rem)] font-semibold leading-snug tracking-tight text-fg">
                      {p.title}
                    </h3>
                  </header>

                  <div className="p-5 sm:p-7">
                    <ol className="space-y-3.5">
                      {shown.map((b, i) => (
                        <li key={b} className="grid grid-cols-[1.75rem_1fr] gap-2 text-[0.93rem] leading-relaxed text-fg-muted">
                          <span aria-hidden className="pt-[0.2rem] font-mono text-xs text-accent">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ol>
                    {hidden > 0 && (
                      <button
                        type="button"
                        tabIndex={on ? 0 : -1}
                        aria-expanded={open}
                        onClick={() => {
                          setExpanded((x) => ({ ...x, [p.id]: !open }));
                          pause();
                        }}
                        className="mt-4 inline-flex items-center gap-1.5 rounded-lg font-mono text-xs font-medium uppercase tracking-[0.12em] text-accent"
                      >
                        {open ? "Show less" : `Show all ${p.bullets.length}`}
                        <ChevronDown className={cx("h-3.5 w-3.5 transition-transform", open && "rotate-180")} aria-hidden />
                      </button>
                    )}
                  </div>

                  <aside className="flex flex-col gap-6 border-t border-border bg-bg-subtle/60 p-5 sm:p-6 md:border-t-0 md:border-l">
                    {p.result && (
                      <div>
                        <p className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-success">Result</p>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-fg">{p.result}</p>
                      </div>
                    )}
                    <div>
                      <p className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-fg-subtle">Stack</p>
                      <ul className="mt-2.5 flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <li key={t} className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-[0.7rem] text-fg-muted">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                </div>
              );
            })}
          </div>
        </Console>
      </div>
    </Section>
  );
}
