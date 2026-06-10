"use client";
import { useState, useEffect } from "react";
import data from "@/data/portfolioData.json";


const NAV_ITEMS = [
  { id: "hero", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (open) {
        setOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  // Lock background scroll when mobile menu is open to prevent rendering conflicts and layout shifts
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActive(top.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    setOpen(false);
    // Add a short delay so the mobile menu starts closing before smooth scroll begins,
    // which prevents rendering/GPU layout glitching on mobile browsers.
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-[var(--color-bg-primary)]/80 backdrop-blur-xl border-b border-[var(--color-border)]"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button onClick={() => scrollTo("hero")} className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
          AS<span className="text-[var(--color-accent)]">.</span>
        </button>

        {/* Desktop */}
        <ul className="hidden gap-8 md:flex">
          {NAV_ITEMS.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => scrollTo(n.id)}
                className={`relative text-sm font-medium transition-colors duration-200 ${active === n.id
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
              >
                {n.label}
                {active === n.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--color-accent)]" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Resume CTA - desktop */}
        <a
          href={data.hero.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-lg border border-[var(--color-accent)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] transition-all duration-200 hover:bg-[var(--color-accent)] hover:text-white"
        >
          Resume
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-5 bg-[var(--color-text-primary)] transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-[var(--color-text-primary)] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-[var(--color-text-primary)] transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 h-[100dvh] w-screen z-40 bg-[var(--color-bg-primary)] transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-8">
          {NAV_ITEMS.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => scrollTo(n.id)}
                className={`text-2xl font-medium transition-colors ${active === n.id ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]"
                  }`}
              >
                {n.label}
              </button>
            </li>
          ))}
          <li>
            <a
              href={data.hero.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex rounded-lg border border-[var(--color-accent)] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)] transition-all hover:bg-[var(--color-accent)] hover:text-white"
            >
              View Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
