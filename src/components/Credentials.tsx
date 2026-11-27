import { ArrowUpRight, Clock, GraduationCap, ShieldCheck } from "lucide-react";
import { plural, site } from "@/lib/site";
import { Chip, ExternalLink, Section, cardClass, cardHoverClass } from "./ui";

export default function Credentials() {
  const { active, inProgress } = site.certifications;
  const edu = site.education;

  return (
    <Section
      id="credentials"
      eyebrow="Credentials"
      title="Certifications & education"
      intro={`${plural(active.length, "active certification")} across AWS, Microsoft Azure, and the FinOps Foundation.`}
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {active.map((c, i) => (
          <li key={c.name} data-reveal style={{ "--reveal-i": i % 3 } as React.CSSProperties}>
            <article className={`${cardClass} ${cardHoverClass} flex h-full flex-col p-5`}>
              <div className="flex items-start gap-4">
                {/* Logos stay full color on a soft light plate in both themes */}
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl border border-border bg-logo-plate p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
                  <img src={c.logo} alt="" width={48} height={48} loading="lazy" className="h-12 w-12 object-contain" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[0.98rem] font-semibold leading-snug text-fg">{c.name}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{c.issuer}</p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success">
                  <ShieldCheck className="h-4 w-4" aria-hidden />
                  Verified
                </span>
                {c.credentialUrl && (
                  <ExternalLink
                    href={c.credentialUrl}
                    className="inline-flex items-center gap-1 rounded-md text-sm font-semibold text-accent hover:underline"
                    aria-label={`View credential: ${c.name}`}
                  >
                    View credential
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </ExternalLink>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-5">
          <h3 className="flex items-center gap-2 font-mono text-micro font-medium uppercase text-fg-subtle">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            In progress
          </h3>
          <ul className="mt-4 space-y-3">
            {inProgress.map((c) => (
              <li key={c.name} className={`${cardClass} flex flex-wrap items-center gap-x-4 gap-y-2 p-4`}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-border bg-logo-plate p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
                  <img src={c.logo} alt="" width={36} height={36} loading="lazy" className="h-9 w-9 object-contain" />
                </span>
                <div className="min-w-[10rem] flex-1">
                  <p className="text-sm font-semibold text-fg">{c.name}</p>
                  <p className="text-xs text-fg-muted">{c.issuer}</p>
                </div>
                <span className="ml-16 shrink-0 rounded-full border border-[rgb(var(--warning-rgb)/0.35)] sm:ml-0 bg-[rgb(var(--warning-rgb)/0.08)] px-2.5 py-0.5 text-xs font-semibold text-warning">
                  In progress
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal style={{ "--reveal-i": 1 } as React.CSSProperties} className="lg:col-span-7">
          <h3 className="flex items-center gap-2 font-mono text-micro font-medium uppercase text-fg-subtle">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden />
            Education
          </h3>
          <article className={`${cardClass} mt-4 p-6 sm:p-7`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h4 className="font-display text-lg font-semibold text-fg">{edu.institution}</h4>
                <p className="mt-1 text-[0.95rem] text-fg">{edu.degree}</p>
                <p className="mt-0.5 text-sm text-fg-muted">
                  Minor in {edu.minor} · {edu.location}
                </p>
              </div>
              <span className="font-mono text-xs text-fg-subtle">{edu.years}</span>
            </div>
            <p className="mt-6 font-mono text-micro font-medium uppercase text-fg-subtle">Relevant coursework</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {edu.coursework.map((c) => (
                <li key={c}>
                  <Chip>{c}</Chip>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </Section>
  );
}
