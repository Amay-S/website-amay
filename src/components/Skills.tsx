"use client";

import { useState } from "react";
import { pmMetrics, skillGroups } from "@/lib/site";
import { Console, Section, Signal, cx } from "./ui";

const NOUN: Record<string, [string, string]> = {
  cloud: ["platform", "platforms"],
  methodology: ["practice", "practices"],
  target: ["competency", "competencies"],
  tools: ["tool", "tools"],
  aws: ["service", "services"],
  database: ["technology", "technologies"],
};

/** One categorical color per domain, so tabs, cards and bars read as one system. */
const TONES = ["var(--accent)", "var(--accent-2)", "var(--accent-3)", "var(--warning)", "var(--success)", "var(--fg-muted)"];

export default function Skills() {
  const [filter, setFilter] = useState<string>("all");
  const total = skillGroups.reduce((n, g) => n + g.items.length, 0);
  const max = Math.max(...skillGroups.map((g) => g.items.length));

  return (
    <Section
      id="skills"
      eyebrow="Metrics & skills"
      title="Delivery by the numbers"
      intro="The operating metrics behind my programs, and the toolkit I use to run them."
    >
      {/* ── PM metrics ── */}
      <Console
        title="PM metrics · delivery & quality"
        meta={<Signal tone="success">{pmMetrics.length} indicators</Signal>}
        bodyClassName="p-3 sm:p-4"
      >
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {pmMetrics.map((m) => (
            <div key={m.label} className="kpi-pop flex flex-col rounded-xl border border-border bg-surface p-4 sm:p-5">
              <dt className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-fg-subtle">{m.label}</dt>
              <dd className="mt-3 font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.4rem)] font-semibold leading-none tracking-tight text-fg">
                {m.value}
              </dd>
              <dd className="mt-2.5 text-xs font-medium leading-relaxed text-accent">{m.detail}</dd>
            </div>
          ))}
        </dl>
      </Console>

      {/* ── Toolkit ── */}
      <Console
        title={`Toolkit · ${skillGroups.length} domains`}
        meta={<Signal>{total} skills</Signal>}
        className="mt-8"
      >
        {/* Domain tabs */}
        <div role="group" aria-label="Filter skills by domain" className="flex gap-1.5 overflow-x-auto border-b border-border px-3 py-3 [scrollbar-width:none] sm:px-4">
          {[{ id: "all", label: "All domains", items: [] as string[] }, ...skillGroups].map((g, i) => {
            const on = filter === g.id;
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(g.id)}
                className={cx(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  on ? "border-[rgb(var(--accent-solid-rgb)/0.5)] bg-accent-soft text-fg" : "border-transparent text-fg-muted hover:text-fg",
                )}
              >
                {g.id !== "all" && <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: TONES[i - 1] }} />}
                {g.label}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1fr_19rem]">
          {/* Domain cards */}
          <ul className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4">
            {skillGroups.map((g, i) => {
              const [one, many] = NOUN[g.id] ?? ["item", "items"];
              const on = filter === g.id;
              const dim = filter !== "all" && !on;
              return (
                <li
                  key={g.id}
                  className={cx(
                    "kpi-pop rounded-xl border bg-surface p-4 transition-opacity duration-300",
                    on ? "border-[rgb(var(--accent-solid-rgb)/0.55)] shadow-glow" : "border-border",
                    dim && "opacity-35",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="flex items-center gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-fg-muted">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: TONES[i] }} />
                      {g.label}
                    </p>
                    <p className="font-mono text-[0.68rem] text-fg-subtle">
                      {g.items.length} {g.items.length === 1 ? one : many}
                    </p>
                  </div>
                  <ul className="mt-3.5 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <li key={s} className="rounded-md border border-border bg-surface-2 px-2 py-1 text-[0.78rem] font-medium text-fg-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          {/* Coverage chart: real counts per domain */}
          <aside aria-label="Skills by domain" className="border-t border-border p-5 lg:border-t-0 lg:border-l">
            <p className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-fg-subtle">Coverage by domain</p>
            <p className="mt-3 font-display text-4xl font-semibold leading-none tracking-tight text-fg">{total}</p>
            <p className="mt-1.5 text-xs text-fg-muted">skills across {skillGroups.length} domains</p>
            <ul className="mt-6 space-y-3.5">
              {skillGroups.map((g, i) => {
                const on = filter === "all" || filter === g.id;
                return (
                  <li key={g.id} className={cx("transition-opacity duration-300", !on && "opacity-35")}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="text-fg">{g.label}</span>
                      <span className="font-mono text-xs text-fg-muted">{g.items.length}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(g.items.length / max) * 100}%`, background: TONES[i] }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </Console>
    </Section>
  );
}
