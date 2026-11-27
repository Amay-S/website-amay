"use client";

import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, hero } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";
import { Container, LogoMark, btnPrimary, cx } from "./ui";

const LINKS = NAV_ITEMS.filter((n) => n.id !== "contact");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section indicator
  useEffect(() => {
    const els = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis.length) setActive(vis.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < 200 && setActive("");
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // Mobile menu: Escape to close, focus management, scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Release the scroll lock *before* the browser jumps to the anchor.
  function closeForJump() {
    document.documentElement.style.overflow = "";
    setOpen(false);
  }

  function goTop(e: React.MouseEvent) {
    setOpen(false);
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0 });
      history.replaceState(null, "", "/");
    }
  }

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-border bg-[rgb(var(--bg-rgb)/0.78)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link href="/" onClick={goTop} className="flex items-center gap-2.5 rounded-lg" aria-label={`${hero.name}, back to top`}>
          <LogoMark />
          <span className="whitespace-nowrap font-display text-[0.95rem] font-semibold tracking-tight text-fg">{hero.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-border bg-[rgb(var(--surface-rgb)/0.6)] p-1 shadow-sm backdrop-blur">
            {LINKS.map((n) => (
              <li key={n.id}>
                <Link
                  href={`/#${n.id}`}
                  aria-current={active === n.id ? "true" : undefined}
                  className={cx(
                    "block rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    active === n.id ? "bg-accent-soft text-accent" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={hero.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg sm:inline-flex"
          >
            <FileText className="h-4 w-4" aria-hidden />
            Résumé
          </a>
          <Link href="/#contact" className={cx(btnPrimary, "h-10 py-0 max-sm:hidden")}>
            Get in touch
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-fg lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </Container>

      {/* Mobile menu: drops in place under the bar (no slide-from-edge jump) */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-border bg-bg lg:hidden"
      >
        <Container className="py-4">
          <nav aria-label="Mobile">
            <ul className="grid gap-1">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <Link
                    href={`/#${n.id}`}
                    onClick={closeForJump}
                    className={cx(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium",
                      active === n.id ? "bg-accent-soft text-accent" : "text-fg hover:bg-surface-2",
                    )}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={hero.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className={cx(btnPrimary, "mt-4 w-full")}
          >
            <FileText className="h-4 w-4" aria-hidden />
            View résumé
          </a>
        </Container>
      </div>
    </header>
  );
}
