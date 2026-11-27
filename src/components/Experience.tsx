"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";
import { Section, cx } from "./ui";

const roles = site.experience;

/**
 * Role switcher: pick a role on the left, read it in full on the right.
 * No scroll-driven animation; everything is static until the visitor acts.
 */
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
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
        {/* Role list */}
        <div
          role="tablist"
          aria-label="Roles"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:sticky lg:top-24 lg:col-span-4 lg:flex lg:flex-col lg:self-start"
        >
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
                  "relative overflow-hidden rounded-xl border p-4 text-left transition-[background-color,border-color,box-shadow] duration-200 sm:p-5",
                  on
                    ? "border-border-strong bg-surface shadow-md"
                    : "border-transparent bg-transparent hover:border-border hover:bg-surface/60",
                )}
              >
                <span
                  aria-hidden
                  className={cx(
                    "absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-accent-solid to-accent-2 transition-opacity",
                    on ? "opacity-100" : "opacity-0",
                  )}
                />
                <span className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-fg-subtle">
                    {role.startDate} – {role.endDate}
                  </span>
                  {role.current && (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider text-accent">
                      Now
                    </span>
                  )}
                </span>
                <span className={cx("mt-2 block font-display text-base font-semibold", on ? "text-fg" : "text-fg-muted")}>
                  {role.company}
                </span>
                <span className="mt-0.5 block text-sm text-fg-muted">{role.role}</span>
              </button>
            );
          })}
        </div>

        {/* Role detail */}
        <article
          id="role-panel"
          role="tabpanel"
          aria-labelledby={`role-tab-${r.id}`}
          className="hud relative overflow-hidden rounded-2xl border border-border bg-surface shadow-md lg:col-span-8"
        >
          <div key={r.id} className="animate-[panel-in_260ms_var(--ease-out-soft)]">
            <header className="flex flex-col gap-3 border-b border-border p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
              <div>
                <h3 className="font-display text-h3 font-semibold text-fg">{r.role}</h3>
                <p className="mt-1.5 text-sm text-fg-muted">
                  <span className="font-medium text-fg">{r.company}</span> · {r.location} · {r.type}
                </p>
              </div>
              <p className="shrink-0 font-mono text-xs text-fg-subtle sm:pt-1.5">
                {r.startDate} – {r.endDate}
              </p>
            </header>

            {/* Impact strip */}
            <dl className="grid grid-cols-2 gap-px border-b border-border bg-border sm:grid-cols-4">
              {r.metrics.map((m) => (
                <div key={m.label} className="flex flex-col bg-surface px-6 py-4 sm:px-8">
                  <dt className="order-2 mt-1 text-xs text-fg-muted">{m.label}</dt>
                  <dd className="order-1 font-display text-2xl font-semibold tracking-tight text-fg">{m.value}</dd>
                </div>
              ))}
              {/* keep the grid tidy when a role has fewer than 4 metrics */}
              {Array.from({ length: (4 - (r.metrics.length % 4)) % 4 }).map((_, i) => (
                <div key={`pad-${i}`} aria-hidden className="hidden bg-surface sm:block" />
              ))}
            </dl>

            <ol className="space-y-4 p-6 sm:p-8">
              {r.bullets.map((b, i) => (
                <li key={b} className="grid grid-cols-[2rem_1fr] gap-2 text-[0.95rem] leading-relaxed text-fg-muted">
                  <span aria-hidden className="pt-[0.2rem] font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="max-w-[75ch]">{b}</span>
                </li>
              ))}
            </ol>

            <ul aria-label="Focus tags" className="flex flex-wrap gap-1.5 border-t border-border bg-bg-subtle px-6 py-4 sm:px-8">
              {r.tags.map((t) => (
                <li key={t} className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-fg-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </Section>
  );
}
