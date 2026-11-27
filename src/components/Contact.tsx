"use client";

import { ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { useState } from "react";
import { hero } from "@/lib/site";
import { Container, Eyebrow, ExternalLink, GitHubIcon, LinkedInIcon, btnPrimary, btnSecondary } from "./ui";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(hero.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${hero.email}`;
    }
  }

  const links = [
    { href: hero.linkedin, label: "LinkedIn", sub: "linkedin.com/in/amay-shah", icon: <LinkedInIcon className="h-5 w-5" /> },
    { href: hero.github, label: "GitHub", sub: "github.com/Amay-S", icon: <GitHubIcon className="h-5 w-5" /> },
    { href: hero.resumePath, label: "Resume", sub: "PDF, 1 page", icon: <FileText className="h-5 w-5" aria-hidden /> },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-16 sm:py-20 lg:py-24">
      <Container>
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-lg sm:p-12 lg:p-16"
        >
          <div aria-hidden className="bg-aurora absolute inset-0 -z-10 opacity-90" />
          <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_80%_at_100%_0%,#000,transparent_70%)]" />

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Contact</Eyebrow>
              <h2 id="contact-title" className="mt-4 font-display text-h1 font-semibold tracking-tight text-fg">
                Let&rsquo;s talk about your next program.
              </h2>
              <p className="mt-4 max-w-[52ch] text-lead text-fg-muted">
                Email is the fastest way to reach me. I&rsquo;m also on LinkedIn.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={`mailto:${hero.email}`} className={btnPrimary}>
                  <Mail className="h-4 w-4" aria-hidden />
                  Email me
                </a>
                <button type="button" onClick={copy} className={btnSecondary}>
                  {copied ? <Check className="h-4 w-4 text-success" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                  <span className="font-mono text-[0.8rem] font-medium">{hero.email}</span>
                </button>
              </div>
              <p role="status" aria-live="polite" className="mt-2 h-5 text-sm text-success">
                {copied ? "Email address copied to clipboard" : ""}
              </p>
            </div>

            <ul className="grid gap-3 lg:col-span-5">
              {links.map((l) => (
                <li key={l.label}>
                  <ExternalLink
                    href={l.href}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-[rgb(var(--surface-rgb)/0.75)] p-4 backdrop-blur transition-colors hover:border-border-strong hover:bg-surface"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-fg">{l.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-fg">{l.label}</span>
                      <span className="block truncate font-mono text-xs text-fg-subtle">{l.sub}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-fg-subtle transition-colors group-hover:text-fg" aria-hidden />
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
