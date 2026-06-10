import data from "@/data/portfolioData.json";

function GradCapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
    </svg>
  );
}

export default function Education() {
  const { education: edu } = data;
  return (
    <section id="education" className="bg-transparent py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">Academic</p>
        <h2 className="mb-16 text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
          Education
        </h2>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8 transition-all duration-300 hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-card-hover)] sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
              <GradCapIcon />
            </div>
            <div className="flex-1">
              <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{edu.institution}</h3>
                <span className="self-start shrink-0 rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
                  {edu.years}
                </span>
              </div>
              <p className="mb-1 text-base font-medium text-[var(--color-text-secondary)]">{edu.degree}</p>
              <p className="mb-6 text-sm text-[var(--color-text-muted)]">Minor: {edu.minor} · {edu.location}</p>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((c) => (
                  <span key={c} className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-1 text-xs font-medium text-[var(--color-text-muted)] transition-all duration-200 cursor-default hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
