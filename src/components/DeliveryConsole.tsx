"use client";

import { Check, Pause, Play } from "lucide-react";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import { cx } from "./ui";

/** How I ship — each stage is drawn from the resume, not invented. */
const STAGES = [
  {
    key: "discover",
    label: "Discover",
    sub: "Requirements → PRDs",
    detail: "Translate business requirements and PRDs into technical specifications and architectural milestones.",
  },
  {
    key: "plan",
    label: "Plan",
    sub: "1-week sprints",
    detail: "Run sprint cadences across 4 concurrent workstreams for 40+ distributed engineers and QA.",
  },
  {
    key: "build",
    label: "Build",
    sub: "Unblock & integrate",
    detail: "Facilitate whiteboard sessions on tough implementation issues and coordinate third-party systems integrations.",
  },
  {
    key: "validate",
    label: "Validate",
    sub: "UAT & AI/ML checks",
    detail: "Rigorous UAT across releases and AI/ML pipelines, which drove a 20% data integrity gain.",
  },
  {
    key: "release",
    label: "Release",
    sub: "Zero-downtime deploys",
    detail: "CI/CD coordination from UAT to staging to multi-region production: 4+ releases every month.",
  },
  {
    key: "measure",
    label: "Measure",
    sub: "Power BI reporting",
    detail: "Dashboards that track project health and delivery milestones against platform goals.",
  },
] as const;

export default function DeliveryConsole() {
  const { index, setIndex, autoplay, userPaused, reduced, toggleUserPaused, containerProps, progressProps } =
    useAutoAdvance(STAGES.length);

  return (
    <div
      {...containerProps}
      style={{ "--progress-ms": "4000ms" } as React.CSSProperties}
      className="relative overflow-hidden rounded-2xl border border-border bg-[rgb(var(--surface-rgb)/0.82)] shadow-lg backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-success" />
          <p className="truncate font-mono text-xs text-fg-muted">
            <span className="text-fg">how-i-ship</span> · release pipeline
          </p>
        </div>
        {!reduced && (
          <button
            type="button"
            onClick={toggleUserPaused}
            aria-label={userPaused ? "Play pipeline tour" : "Pause pipeline tour"}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
          >
            {userPaused ? <Play className="h-3.5 w-3.5" aria-hidden /> : <Pause className="h-3.5 w-3.5" aria-hidden />}
          </button>
        )}
      </div>

      {/* Stages */}
      <ol className="relative p-2.5 sm:p-3">
        {STAGES.map((s, i) => {
          const isActive = i === index;
          const isDone = i < index;
          return (
            <li key={s.key} className="relative">
              {/* rail */}
              {i < STAGES.length - 1 && (
                <span
                  aria-hidden
                  className={cx(
                    "absolute left-[1.6rem] top-10 bottom-[-0.5rem] w-px sm:left-[1.85rem]",
                    isDone ? "bg-accent-solid/50" : "bg-border",
                  )}
                />
              )}
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={isActive ? "step" : undefined}
                className={cx(
                  "relative flex w-full items-start gap-3.5 rounded-xl px-3 py-2.5 text-left transition-colors sm:px-3.5",
                  isActive ? "bg-accent-soft" : "hover:bg-surface-2",
                )}
              >
                <span
                  aria-hidden
                  className={cx(
                    "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-[0.7rem] font-semibold",
                    isActive && "border-accent-solid bg-accent-solid text-white",
                    isDone && "border-accent-solid/40 bg-surface text-accent",
                    !isActive && !isDone && "border-border bg-surface text-fg-subtle",
                  )}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className={cx("text-sm font-semibold", isActive ? "text-fg" : "text-fg-muted")}>{s.label}</span>
                    <span className="font-mono text-[0.7rem] text-fg-subtle">{s.sub}</span>
                  </span>
                  {isActive && (
                    <>
                      <span className="mt-1.5 block text-sm leading-relaxed text-fg-muted">{s.detail}</span>
                      <span aria-hidden className="mt-3 block h-[3px] overflow-hidden rounded-full bg-border">
                        <span
                          key={progressProps.key}
                          className={cx(
                            "block h-full w-full rounded-full bg-gradient-to-r from-accent-solid to-accent-2",
                            progressProps.className || (autoplay ? "" : "scale-x-100"),
                          )}
                          onAnimationEnd={"onAnimationEnd" in progressProps ? progressProps.onAnimationEnd : undefined}
                        />
                      </span>
                    </>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Polite announcement only when the visitor is driving */}
      <p className="sr-only" aria-live={autoplay ? "off" : "polite"}>
        {`Stage ${index + 1} of ${STAGES.length}: ${STAGES[index].label}. ${STAGES[index].detail}`}
      </p>
    </div>
  );
}
