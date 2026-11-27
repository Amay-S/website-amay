"use client";

import { useState } from "react";
import { pmMetrics, skillGroups } from "@/lib/site";
import { Section, cx } from "./ui";

const NOUN: Record<string, [string, string]> = {
  cloud: ["platform", "platforms"],
  methodology: ["practice", "practices"],
  target: ["competency", "competencies"],
  tools: ["tool", "tools"],
  aws: ["service", "services"],
  database: ["technology", "technologies"],
};

export default function Skills() {
  const [filter, setFilter] = useState<string>("all");
  const totalSkills = skillGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <Section
      id="skills"
      eyebrow="Metrics & skills"
      title="Delivery by the numbers"
      intro="The operating metrics behind my programs, and the toolkit I use to run them."
    >
      {/* ── PM metrics dashboard ── */}
      <div data-reveal className="hud relative overflow-hidden rounded-2xl border border-border bg-surface shadow-md">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5 sm:px-6">
          <p className="flex items-center gap-2.5 font-mono text-xs text-fg-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-success" />
            <span className="text-fg">pm-metrics</span>
            <span className="text-fg-subtle">/ delivery &amp; quality</span>
          </p>
          <p className="font-mono text-xs text-fg-subtle">{pmMetrics.length} indicators</p>
        </div>

        <dl className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {pmMetrics.map((m, i) => (
            <div key={m.label} className="group relative flex flex-col bg-surface p-5 sm:p-6">
              <dt className="flex items-center justify-between gap-2 font-mono text-micro font-medium uppercase text-fg-subtle">
                <span>{m.label}</span>
                <span aria-hidden className="text-accent/70">M{String(i + 1).padStart(2, "0")}</span>
              </dt>
              <dd className="mt-4 font-display text-[clamp(1.9rem,1.5rem+1.4vw,2.75rem)] font-semibold leading-none tracking-tight text-fg">
                {m.value}
              </dd>
              <dd className="mt-3 text-xs leading-relaxed text-fg-muted">{m.detail}</dd>
              <span aria-hidden className="mt-5 h-[2px] w-8 rounded-full bg-gradient-to-r from-accent-solid to-accent-2 transition-[width] duration-300 group-hover:w-14" />
            </div>
          ))}
        </dl>
      </div>

      {/* ── Toolkit readout ── */}
      <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" data-reveal>
        <h3 className="font-display text-h3 font-semibold text-fg">
          Toolkit <span className="font-mono text-sm font-normal text-fg-subtle">· {totalSkills} skills</span>
        </h3>
        <div role="group" aria-label="Filter skills" className="flex flex-wrap gap-1.5">
          {[{ id: "all", label: "All" }, ...skillGroups].map((g) => {
            const on = filter === g.id;
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(g.id)}
                className={cx(
                  "rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors",
                  on
                    ? "border-accent-solid bg-accent-solid text-white"
                    : "border-border bg-surface text-fg-muted hover:border-border-strong hover:text-fg",
                )}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      <ul data-reveal className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        {skillGroups.map((g, i) => {
          const [one, many] = NOUN[g.id] ?? ["item", "items"];
          const dim = filter !== "all" && filter !== g.id;
          const on = filter === g.id;
          return (
            <li
              key={g.id}
              className={cx(
                "relative grid gap-4 px-5 py-5 transition-[opacity,background-color] duration-300 sm:px-6 md:grid-cols-[15rem_1fr] md:gap-8",
                dim && "opacity-35",
                on && "bg-accent-soft/60",
              )}
            >
              {on && <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-accent-solid to-accent-2" />}
              <div className="flex items-baseline gap-3 md:block">
                <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
                <div>
                  <p className="font-display text-base font-semibold text-fg md:mt-1">{g.label}</p>
                  <p className="font-mono text-xs text-fg-subtle">
                    {g.items.length} {g.items.length === 1 ? one : many}
                  </p>
                </div>
              </div>
              <ul className="flex flex-wrap content-start gap-1.5">
                {g.items.map((s) => (
                  <li key={s} className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-[0.8rem] font-medium text-fg-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
