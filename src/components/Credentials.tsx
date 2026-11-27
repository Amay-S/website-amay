import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { plural, site } from "@/lib/site";
import { Console, ExternalLink, Section, Signal, cx } from "./ui";

/** Issuer color, so badges from the same body read as a set. */
function issuerTone(issuer: string) {
  if (issuer.includes("Amazon")) return "var(--warning)";
  if (issuer.includes("Microsoft")) return "var(--accent-2)";
  if (issuer.includes("FinOps")) return "var(--accent)";
  return "var(--accent-3)";
}

export default function Credentials() {
  const { active, inProgress } = site.certifications;
  const edu = site.education;
  const issuers = new Set(active.map((c) => c.issuer)).size;

  return (
    <Section
      id="credentials"
      eyebrow="Credentials"
      title="Certifications & education"
      intro={`${plural(active.length, "active certification")} across AWS, Microsoft Azure, and the FinOps Foundation.`}
    >
      {/* ── Active certifications ── */}
      <Console
        title={`Certifications · ${plural(issuers, "issuer")}`}
        meta={<Signal tone="success">{active.length} verified</Signal>}
        bodyClassName="p-3 sm:p-4"
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {active.map((c) => (
            <li key={c.name} className="sm:last:odd:col-span-2 lg:last:odd:col-span-1">
              <article className="kpi-pop relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface p-4">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] opacity-70"
                  style={{ background: `linear-gradient(90deg, transparent, ${issuerTone(c.issuer)}, transparent)` }}
                />
                <div className="flex items-start justify-between gap-3">
                  {/* Logos stay full color on a soft light plate in both themes */}
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl border border-border bg-logo-plate p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
                    <img src={c.logo} alt="" width={48} height={48} loading="lazy" className="h-12 w-12 object-contain" />
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-[rgb(var(--success-rgb)/0.35)] bg-[rgb(var(--success-rgb)/0.08)] px-2 py-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-success">
                    <ShieldCheck className="h-3 w-3" aria-hidden />
                    Verified
                  </span>
                </div>

                <p className="mt-4 flex items-center gap-1.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-fg-subtle">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: issuerTone(c.issuer) }} />
                  {c.issuer}
                </p>
                <h3 className="mt-1.5 font-display text-[0.95rem] font-semibold leading-snug text-fg">{c.name}</h3>

                {c.credentialUrl && (
                  <ExternalLink
                    href={c.credentialUrl}
                    aria-label={`View credential: ${c.name}`}
                    className="mt-auto inline-flex items-center gap-1 pt-4 font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-accent hover:underline"
                  >
                    View credential
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </ExternalLink>
                )}
              </article>
            </li>
          ))}
        </ul>
      </Console>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
        {/* ── In progress ── */}
        <Console
          title="In progress"
          meta={<Signal tone="warning">{inProgress.length} underway</Signal>}
          className="lg:col-span-5"
        >
          <ul className="divide-y divide-border">
            {inProgress.map((c) => (
              <li key={c.name} className="flex items-center gap-4 px-5 py-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-border bg-logo-plate p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
                  <img src={c.logo} alt="" width={36} height={36} loading="lazy" className="h-9 w-9 object-contain" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-fg-subtle">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: issuerTone(c.issuer) }} />
                    {c.issuer.replace(" (PMI)", "")}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-snug text-fg">{c.name}</p>
                </div>
                <span className="hidden shrink-0 rounded-full border border-[rgb(var(--warning-rgb)/0.35)] bg-[rgb(var(--warning-rgb)/0.08)] px-2 py-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-warning sm:inline">
                  In progress
                </span>
              </li>
            ))}
          </ul>
        </Console>

        {/* ── Education ── */}
        <Console title="Education" meta={<span>{edu.years}</span>} className="lg:col-span-7">
          <div className="p-5 sm:p-6">
            <p className="flex items-center gap-1.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-fg-subtle">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-3" />
              {edu.location}
            </p>
            <h3 className="mt-1.5 font-display text-lg font-semibold text-fg">{edu.institution}</h3>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="kpi-pop rounded-xl border border-border bg-surface px-4 py-3">
                <dt className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-fg-subtle">Degree</dt>
                <dd className="mt-1 text-sm font-medium text-fg">{edu.degree}</dd>
              </div>
              <div className="kpi-pop rounded-xl border border-border bg-surface px-4 py-3">
                <dt className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-fg-subtle">Minor</dt>
                <dd className="mt-1 text-sm font-medium text-fg">{edu.minor}</dd>
              </div>
            </dl>

            <p className="mt-5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.16em] text-fg-subtle">Relevant coursework</p>
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {edu.coursework.map((c) => (
                <li key={c} className={cx("rounded-md border border-border bg-surface-2 px-2 py-1 font-mono text-[0.7rem] text-fg-muted")}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Console>
      </div>
    </Section>
  );
}
