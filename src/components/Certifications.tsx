"use client";

import { useState } from "react";
import data from "@/data/portfolioData.json";

function ShieldCheck() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function Certifications() {
  const { active, inProgress } = data.certifications;
  const [showAllInProgress, setShowAllInProgress] = useState(false);

  const displayedInProgress = showAllInProgress ? inProgress : inProgress.slice(0, 3);

  return (
    <section id="certifications" className="bg-transparent py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">Credentials</p>
        <h2 className="mb-16 text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
          Certifications
        </h2>

        {/* Active */}
        <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-400">
          <ShieldCheck />
          Active Certifications
        </h3>
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((cert) => (
            <div
              key={cert.name}
              className="animate-pulse-glow rounded-xl border border-emerald-500/20 bg-[var(--color-bg-card)] p-6 transition-all duration-300 hover:border-emerald-500/40 flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">
                  <img src={cert.logo} alt={cert.name} className="h-16 w-16 object-contain" />
                </div>
                <h4 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">{cert.name}</h4>
                <p className="mb-4 text-sm text-[var(--color-text-muted)]">{cert.issuer}</p>
              </div>
              <div className="flex items-center justify-between gap-4 mt-auto">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <ShieldCheck />
                  Verified
                </span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors duration-200"
                  >
                    <span>Show Certification</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" x2="21" y1="14" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* In Progress */}
        <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
          <ClockIcon />
          In-Progress Milestones
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedInProgress.map((cert) => (
            <div
              key={cert.name}
              className="rounded-xl border border-amber-500/20 bg-[var(--color-bg-card)] p-6 transition-all duration-300 hover:border-amber-500/40"
            >
              <div className="mb-4 opacity-60">
                <img src={cert.logo} alt={cert.name} className="h-16 w-16 object-contain" />
              </div>
              <h4 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">{cert.name}</h4>
              <p className="mb-3 text-sm text-[var(--color-text-muted)]">{cert.issuer}</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                <ClockIcon />
                In Progress
              </span>
            </div>
          ))}
        </div>

        {inProgress.length > 3 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAllInProgress(!showAllInProgress)}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] cursor-pointer"
            >
              {showAllInProgress ? (
                <>
                  <span>View Less</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </>
              ) : (
                <>
                  <span>View More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
