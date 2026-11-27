"use client";

import { ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { hero } from "@/lib/site";
import { Console, Container, Eyebrow, ExternalLink, GitHubIcon, LinkedInIcon, Signal, btnPrimary, cx } from "./ui";

/** Live local time in Phoenix (MST, no daylight saving). Client-only to avoid hydration mismatch. */
function useLocalTime() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Phoenix", hour: "numeric", minute: "2-digit" });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const rowAction =
  "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-fg-muted transition-colors hover:border-[rgb(var(--accent-solid-rgb)/0.5)] hover:text-fg";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const time = useLocalTime();

  async function copy() {
    try {
      await navigator.clipboard.writeText(hero.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${hero.email}`;
    }
  }

  const channels = [
    { key: "linkedin", label: "LinkedIn", value: "linkedin.com/in/amay-shah", href: hero.linkedin, icon: <LinkedInIcon className="h-4 w-4" />, action: "Connect" },
    { key: "github", label: "GitHub", value: "github.com/Amay-S", href: hero.github, icon: <GitHubIcon className="h-4 w-4" />, action: "Open" },
    { key: "resume", label: "Resume", value: "PDF · 1 page", href: hero.resumePath, icon: <FileText className="h-4 w-4" aria-hidden />, action: "View" },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate py-16 sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-aurora absolute inset-0 opacity-80 [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" />
      </div>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div data-reveal className="lg:col-span-5">
            <Eyebrow>Contact</Eyebrow>
            <h2 id="contact-title" className="mt-4 font-display text-h1 font-semibold tracking-tight text-fg">
              Let&rsquo;s talk about your <span className="text-gradient">next program.</span>
            </h2>
            <p className="mt-4 max-w-[46ch] text-lead text-fg-muted">
              Email is the fastest way to reach me. I&rsquo;m also on LinkedIn.
            </p>
            <a href={`mailto:${hero.email}`} className={cx(btnPrimary, "mt-8")}>
              <Mail className="h-4 w-4" aria-hidden />
              Email me
            </a>
          </div>

          <div data-reveal style={{ "--reveal-i": 1 } as React.CSSProperties} className="lg:col-span-7">
            <Console
              title="Contact · channels"
              meta={<Signal tone="success">{time ? `Phoenix · ${time} MST` : "Phoenix, AZ"}</Signal>}
            >
              {/* Primary channel: email */}
              <div className="border-b border-border p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-fg-subtle">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Email
                  </p>
                  <span className="rounded-full border border-[rgb(var(--accent-solid-rgb)/0.45)] bg-accent-soft px-2.5 py-0.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-accent">
                    Preferred
                  </span>
                </div>
                <p className="mt-3 break-all font-mono text-[clamp(1rem,0.85rem+0.7vw,1.35rem)] text-fg">{hero.email}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={copy} className={rowAction}>
                    {copied ? <Check className="h-3.5 w-3.5 text-success" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <a href={`mailto:${hero.email}`} className={rowAction}>
                    <Mail className="h-3.5 w-3.5" aria-hidden />
                    Compose
                  </a>
                </div>
                <p role="status" aria-live="polite" className="sr-only">
                  {copied ? "Email address copied to clipboard" : ""}
                </p>
              </div>

              {/* Other channels */}
              <ul className="divide-y divide-border">
                {channels.map((c) => (
                  <li key={c.key}>
                    <ExternalLink
                      href={c.href}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2 sm:px-6"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-surface text-fg-muted transition-colors group-hover:border-[rgb(var(--accent-solid-rgb)/0.5)] group-hover:text-accent">
                        {c.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.66rem] font-medium uppercase tracking-[0.16em] text-fg-subtle">{c.label}</span>
                        <span className="mt-0.5 block truncate text-sm font-medium text-fg">{c.value}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-subtle transition-colors group-hover:text-accent">
                        {c.action}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </Console>
          </div>
        </div>
      </Container>
    </section>
  );
}
