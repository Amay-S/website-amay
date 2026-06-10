import data from "@/data/portfolioData.json";

export default function Experience() {
  return (
    <section id="experience" className="bg-transparent py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">Career</p>
        <h2 className="mb-16 text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
          Experience
        </h2>

        <div className="relative space-y-0">
          {data.experience.map((exp, idx) => (
            <div key={exp.id} className="relative pl-12 pb-12 last:pb-0">
              {/* Connector line */}
              {idx < data.experience.length - 1 && (
                <div className="absolute left-[14px] top-[34px] bottom-0 w-px bg-[var(--color-border)]" />
              )}

              {/* Timeline dot — static */}
              <div className="absolute left-0 top-2 h-[30px] w-[30px] rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-accent)]/10 flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-[var(--shadow-accent)] sm:p-8">
                {/* Header */}
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{exp.role}</h3>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      {exp.company}
                      <span className="mx-2 text-[var(--color-text-muted)]">·</span>
                      {exp.type}
                      <span className="mx-2 text-[var(--color-text-muted)]">·</span>
                      {exp.location}
                    </p>
                  </div>
                  <span className="shrink-0 self-start rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>

                {/* Inline metrics */}
                <div className="mb-5 flex flex-wrap gap-3">
                  {exp.metrics.map((m) => (
                    <div key={m.label} className="rounded-lg bg-[var(--color-bg-elevated)] px-3 py-1.5 text-center">
                      <span className="text-sm font-bold text-[var(--color-accent)]">{m.value}</span>
                      <span className="ml-1.5 text-xs text-[var(--color-text-muted)]">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Bullets */}
                <ul className="mb-5 space-y-3">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <span key={t} className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-muted)] transition-all duration-200 cursor-default hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
