import { ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { Chip, Section, cardClass, cardHoverClass } from "./ui";

const VISIBLE = 3;

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Shipping programs end to end"
      intro="From enterprise data warehouses in government to AI-powered FinOps platforms in the private sector."
    >
      <ol className="relative">
        {/* rail */}
        <span aria-hidden className="absolute top-3 bottom-3 hidden w-px md:block bg-gradient-to-b from-accent-solid/60 via-border to-transparent md:left-[calc(25%+7px)]" />

        {site.experience.map((exp, i) => {
          const shown = exp.bullets.slice(0, VISIBLE);
          const rest = exp.bullets.slice(VISIBLE);
          return (
            <li key={exp.id} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="relative grid gap-4 pb-12 last:pb-0 md:grid-cols-4 md:gap-10">
              {/* node */}
              <span
                aria-hidden
                className={`absolute left-0 top-2 hidden h-[15px] w-[15px] place-items-center rounded-full border-2 md:left-[25%] md:grid ${
                  exp.current ? "border-accent-solid bg-accent-soft" : "border-border-strong bg-bg"
                }`}
              >
                {exp.current && <span className="h-1.5 w-1.5 rounded-full bg-accent-solid" />}
              </span>

              {/* meta column */}
              <div className="md:pr-6 md:text-right">
                <p className="font-mono text-xs text-fg-subtle">
                  <time>{exp.startDate}</time> – <time>{exp.endDate}</time>
                </p>
                <p className="mt-1.5 font-display text-base font-semibold text-fg">{exp.company}</p>
                <p className="mt-0.5 text-sm text-fg-muted">
                  {exp.location} · {exp.type}
                </p>
                {exp.current && (
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent">
                    Current role
                  </span>
                )}
              </div>

              {/* content card */}
              <article className={`${cardClass} ${cardHoverClass} p-6 sm:p-7 md:col-span-3 md:ml-6`}>
                <h3 className="font-display text-h3 font-semibold text-fg">{exp.role}</h3>

                <dl className="mt-4 flex flex-wrap gap-2">
                  {exp.metrics.map((m) => (
                    <div key={m.label} className="flex flex-row-reverse items-baseline justify-end gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5">
                      <dt className="text-xs text-fg-muted">{m.label}</dt>
                      <dd className="font-display text-sm font-semibold text-accent">{m.value}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-5 space-y-3">
                  {shown.map((b) => (
                    <Bullet key={b}>{b}</Bullet>
                  ))}
                </ul>

                {rest.length > 0 && (
                  <details className="group mt-3">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-lg py-1 text-sm font-semibold text-accent [&::-webkit-details-marker]:hidden">
                      <span className="group-open:hidden">Show {rest.length} more</span>
                      <span className="hidden group-open:inline">Show less</span>
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden />
                    </summary>
                    <ul className="mt-3 space-y-3">
                      {rest.map((b) => (
                        <Bullet key={b}>{b}</Bullet>
                      ))}
                    </ul>
                  </details>
                )}

                <ul className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5" aria-label="Focus tags">
                  {exp.tags.map((t) => (
                    <li key={t}>
                      <Chip>{t}</Chip>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[0.95rem] leading-relaxed text-fg-muted">
      <span aria-hidden className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
      <span className="max-w-[75ch]">{children}</span>
    </li>
  );
}
