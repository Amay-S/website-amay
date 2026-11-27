import Link from "next/link";
import { ArrowRight, FileText, MapPin } from "lucide-react";
import { hero } from "@/lib/site";
import DeliveryConsole from "./DeliveryConsole";
import { Container, ExternalLink, GitHubIcon, LinkedInIcon, btnPrimary, btnSecondary } from "./ui";

export default function Hero() {
  const featured = hero.highlights.filter((h) => h.featured);

  return (
    <section id="top" aria-label="Introduction" className="relative isolate pt-28 pb-4 sm:pt-36 sm:pb-8">
      {/* Background: fading grid + soft aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-aurora absolute inset-x-0 top-0 h-[44rem]" />
        <div className="bg-grid absolute inset-x-0 top-0 h-[44rem]" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <div className="lg:col-span-7">
            <p
              data-reveal
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-fg-muted shadow-sm"
            >
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
              <span className="truncate">
                {hero.currentRole.title} at <span className="text-fg">{hero.currentRole.company}</span>
              </span>
            </p>

            <h1 data-reveal style={{ "--reveal-i": 1 } as React.CSSProperties} className="mt-6 font-display text-display font-semibold text-fg">
              {hero.name}
            </h1>

            <p
              data-reveal
              style={{ "--reveal-i": 2 } as React.CSSProperties}
              className="mt-5 max-w-[34ch] font-display text-[clamp(1.35rem,1.05rem+1.2vw,2rem)] font-medium leading-snug tracking-tight text-fg"
            >
              I turn product vision into reliable, shipped{" "}
              <span className="text-gradient">AI and FinOps software.</span>
            </p>

            <p data-reveal style={{ "--reveal-i": 3 } as React.CSSProperties} className="mt-5 max-w-[60ch] text-lead text-fg-muted">
              {hero.intro}
            </p>

            <div data-reveal style={{ "--reveal-i": 4 } as React.CSSProperties} className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className={btnPrimary}>
                Get in touch
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a href={hero.resumePath} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                <FileText className="h-4 w-4" aria-hidden />
                View résumé
              </a>
            </div>

            <ul
              data-reveal
              style={{ "--reveal-i": 5 } as React.CSSProperties}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-muted"
            >
              <li className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden />
                {hero.location.replace(", USA", "")}
              </li>
              <li>
                <ExternalLink href={hero.linkedin} className="flex items-center gap-1.5 transition-colors hover:text-fg">
                  <LinkedInIcon />
                  LinkedIn
                </ExternalLink>
              </li>
              <li>
                <ExternalLink href={hero.github} className="flex items-center gap-1.5 transition-colors hover:text-fg">
                  <GitHubIcon />
                  GitHub
                </ExternalLink>
              </li>
            </ul>
          </div>

          <div data-reveal style={{ "--reveal-i": 2 } as React.CSSProperties} className="lg:col-span-5">
            <DeliveryConsole />
          </div>
        </div>

        {/* Proof row */}
        <dl
          data-reveal
          className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm sm:mt-20 lg:grid-cols-4"
        >
          {featured.map((h, i) => (
            <div
              key={h.label}
              className={[
                "flex flex-col gap-1 p-5 sm:p-6",
                i % 2 === 1 ? "border-l border-border" : "",
                i >= 2 ? "border-t border-border lg:border-t-0" : "",
                i === 2 ? "lg:border-l" : "",
              ].join(" ")}
            >
              <dt className="order-2 text-sm font-medium text-fg">{h.label}</dt>
              <dd className="order-1 font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] font-semibold tracking-tight text-fg">
                {h.value}
              </dd>
              <dd className="order-3 text-xs text-fg-subtle">{h.description}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
