"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";
import { Console, Section, Signal, cx } from "./ui";

const roles = site.experience;

/** Role switcher in a console: tabs across the top, the full role below. */
export default function Experience() {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const r = roles[index];

  function onKeyDown(e: React.KeyboardEvent) {
    const step = ["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : ["ArrowUp", "ArrowLeft"].includes(e.key) ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const to = (index + step + roles.length) % roles.length;
    setIndex(to);
    tabs.current[to]?.focus();
  }

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Shipping programs end to end"
      intro="From enterprise data warehouses in government to AI-powered FinOps platforms in the private sector."
    >
      <Console title={`Experience · ${roles.length} roles`} meta={<Signal tone="success">Current: {roles[0].company}</Signal>}>
        {/* Role tabs */}
        <div role="tablist" aria-label="Roles" onKeyDown={onKeyDown} className="grid gap-px border-b border-border bg-border sm:grid-cols-2">
          {roles.map((role, i) => {
            const on = i === index;
            return (
              <button
                key={role.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`role-tab-${role.id}`}
                aria-selected={on}
                aria-controls="role-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setIndex(i)}
                className={cx(
                  "relative min-w-0 px-5 py-4 text-left transition-colors sm:px-6",
                  on ? "bg-accent-soft" : "bg-[rgb(var(--surface-rgb)/0.85)] hover:bg-surface-2",
                )}
              >
                <span
                  aria-hidden
                  className={cx(
                    "absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-solid to-accent-2 transition-opacity",
                    on ? "opacity-100" : "opacity-0",
                  )}
                />
                <span className="flex items-center justify-between gap-3">
                  <span className={cx("font-display text-base font-semibold", on ? "text-fg" : "text-fg-muted")}>{role.company}</span>
                  <span className="font-mono text-[0.7rem] text-fg-subtle">
                    {role.startDate} – {role.endDate}
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-sm text-fg-muted">{role.role}</span>
              </button>
            );
          })}
        </div>

        {/* Role detail */}
        <div
          id="role-panel"
          role="tabpanel"
          aria-labelledby={`role-tab-${r.id}`}
          key={r.id}
          className="grid animate-[panel-in_260ms_var(--ease-out-soft)] lg:grid-cols-[20rem_1fr]"
        >
          <aside className="border-b border-border bg-bg-subtle/60 p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <h3 className="font-display text-h3 font-semibold leading-snug text-fg">{r.role}</h3>
            <p className="mt-2 text-sm text-fg-muted">
              <span className="font-medium text-fg">{r.company}</span>
              <br />
              {r.location} · {r.type}
            </p>
            <p className="mt-2 font-mono text-xs text-fg-subtle">
              {r.startDate} – {r.endDate}
            </p>

            <p className="mt-6 font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-fg-subtle">Impact</p>
            <dl className="mt-3 grid grid-cols-2 gap-2.5 lg:grid-cols-1">
              {r.metrics.map((m) => (
                <div key={m.label} className="kpi-pop flex items-baseline justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                  <dt className="text-xs text-fg-muted">{m.label}</dt>
                  <dd className="font-display text-xl font-semibold tracking-tight text-accent">{m.value}</dd>
                </div>
              ))}
            </dl>

            <ul aria-label="Focus tags" className="mt-6 flex flex-wrap gap-1.5">
              {r.tags.map((t) => (
                <li key={t} className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-[0.7rem] text-fg-muted">
                  {t}
                </li>
              ))}
            </ul>
          </aside>

          <ol className="space-y-4 p-5 sm:p-7">
            {r.bullets.map((b, i) => (
              <li key={b} className="grid grid-cols-[2rem_1fr] gap-2 text-[0.95rem] leading-relaxed text-fg-muted">
                <span aria-hidden className="pt-[0.2rem] font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="max-w-[75ch]">{b}</span>
              </li>
            ))}
          </ol>
        </div>
      </Console>
    </Section>
  );
}
