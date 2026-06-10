import data from "@/data/portfolioData.json";

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function Hero() {
  const { hero } = data;
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-20 pb-20">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      {/* Top-right red glow */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 w-full">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-20">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img src="/certs/amay-logo.png" alt="Amay Shah" className="h-80 w-72 rounded-2xl object-cover ring-2 ring-[var(--color-border)] lg:h-[28rem] lg:w-80" />
            <div className="absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-full border-2 border-[var(--color-bg-primary)] bg-emerald-500" />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">
              {hero.title}
            </p>
            <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
              {hero.name}
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg lg:mx-0">
              {hero.tagline}
            </p>
            <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg lg:mx-0">
              {hero.tagline2}
            </p>

            <div className="mx-auto mb-8 flex max-w-2xl flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
              {hero.focusAreas.map((area) => (
                <span key={area} className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)] transition-all duration-200 cursor-default hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5">
                  {area}
                </span>
              ))}
            </div>

            <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--color-text-muted)] lg:justify-start">
              <span className="flex items-center gap-1.5"><LocationIcon />{hero.location}</span>
              <a href={`mailto:${hero.email}`} className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-accent)]">
                <MailIcon />{hero.email}
              </a>
              <a href={hero.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-accent)]">
                <LinkedInIcon />LinkedIn
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href={hero.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-accent)]"
              >
                <DownloadIcon />
                View Resume
              </a>
              <a
                href={`mailto:${hero.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-3 text-sm font-semibold text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* KPI stat cards */}
        <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {hero.highlights.map((h) => (
            <div key={h.label} className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 text-center transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-accent-strong)] hover:bg-[var(--color-accent)]/5">
              <p className="text-3xl font-extrabold text-[var(--color-accent)]">{h.value}</p>
              <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">{h.label}</p>
              <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{h.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
