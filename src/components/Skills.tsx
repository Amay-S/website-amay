import data from "@/data/portfolioData.json";

function CloudIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function MethodologyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function AWSSmallIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      <path d="m13 13 3 3-3 3" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

const ICON_MAP: Record<string, () => React.JSX.Element> = {
  cloud: CloudIcon,
  methodology: MethodologyIcon,
  target: TargetIcon,
  tools: ToolsIcon,
  aws: AWSSmallIcon,
  database: DatabaseIcon,
};

export default function Skills() {
  return (
    <section id="skills" className="bg-transparent py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">Expertise</p>
        <h2 className="mb-16 text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
          PM Metrics Dashboard
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.skillsDashboard.map((skill) => {
            const Icon = ICON_MAP[skill.icon];
            return (
              <div
                key={skill.label}
                className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:shadow-[var(--shadow-accent)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-accent)]">
                    {Icon && <Icon />}
                  </div>
                  <span className="text-3xl font-extrabold text-[var(--color-accent)]">{skill.value}</span>
                </div>
                <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                  {skill.label}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">{skill.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
