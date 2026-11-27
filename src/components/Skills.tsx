"use client";

import { Cloud, Database, ListChecks, Server, Target, Workflow, Wrench } from "lucide-react";
import { useState } from "react";
import { skillGroups } from "@/lib/site";
import { Section, cardClass, cx } from "./ui";

const ICONS: Record<string, typeof Cloud> = {
  cloud: Cloud,
  methodology: Workflow,
  target: Target,
  tools: Wrench,
  aws: Server,
  database: Database,
};

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

  return (
    <Section
      id="skills"
      eyebrow="Skills & stack"
      title="The toolkit behind the delivery"
      intro="Program management practice, the platforms I deliver on, and the tools I use to keep teams aligned."
    >
      <div data-reveal role="group" aria-label="Filter skills" className="mb-8 flex flex-wrap gap-2">
        {[{ id: "all", label: "All" }, ...skillGroups].map((g) => {
          const on = filter === g.id;
          return (
            <button
              key={g.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(g.id)}
              className={cx(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
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

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((g, i) => {
          const Icon = ICONS[g.id] ?? ListChecks;
          const [one, many] = NOUN[g.id] ?? ["item", "items"];
          const dim = filter !== "all" && filter !== g.id;
          return (
            <li
              key={g.id}
              data-reveal
              style={{ "--reveal-i": i % 3 } as React.CSSProperties}
              aria-hidden={dim || undefined}
              className={cx(
                cardClass,
                "p-6 transition-opacity duration-300",
                dim && "opacity-35",
                filter === g.id && "border-accent-solid/50 shadow-md",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-mono text-xs text-fg-subtle">
                  {g.items.length} {g.items.length === 1 ? one : many}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-fg">{g.label}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
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
