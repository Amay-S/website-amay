import type { ComponentProps, ReactNode } from "react";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/** Max-width wrapper with fluid gutters. Wide screens get more air, not longer lines. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx("mx-auto w-full max-w-[76rem] px-5 sm:px-8 lg:px-10 2xl:max-w-[84rem]", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("flex items-center gap-2 font-mono text-micro font-medium uppercase text-accent", className)}>
      <span aria-hidden className="h-px w-6 bg-gradient-to-r from-accent-solid to-accent-2" />
      {children}
    </p>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cx("relative py-16 sm:py-20 lg:py-24", className)}>
      <Container>
        <header className="mb-12 max-w-2xl sm:mb-16" data-reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={`${id}-title`} className="mt-4 font-display text-h2 font-semibold text-fg">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lead text-fg-muted">{intro}</p>}
        </header>
        {children}
      </Container>
    </section>
  );
}

/** Calm surface: soft elevation, low-contrast border, even tint on hover. */
export const cardClass =
  "rounded-2xl border border-border bg-surface shadow-sm transition-[border-color,background-color,box-shadow] duration-200";
export const cardHoverClass = "hover:border-border-strong hover:shadow-md";

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-[background-color,border-color,color,box-shadow] duration-200";
export const btnPrimary = cx(
  btnBase,
  "bg-accent-solid text-on-accent shadow-[0_8px_24px_-10px_rgb(var(--accent-solid-rgb)/0.7)] hover:brightness-110",
);
export const btnSecondary = cx(btnBase, "border border-border-strong bg-surface text-fg hover:border-fg-subtle hover:bg-surface-2");
export const btnGhost = cx(btnBase, "px-3 text-fg-muted hover:bg-surface-2 hover:text-fg");

export function ExternalLink({ href, children, ...rest }: ComponentProps<"a">) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

export function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
      />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
}

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cx(
        "grid place-items-center rounded-lg border border-[rgb(var(--accent-solid-rgb)/0.45)] bg-accent-soft font-display text-[0.8rem] font-bold tracking-tight text-accent shadow-sm",
        className,
      )}
    >
      AS
    </span>
  );
}

/**
 * Console panel: window dots + mono title bar, used for every data panel so
 * the site reads as one instrument.
 */
export function Console({
  title,
  meta,
  children,
  className,
  bodyClassName,
}: {
  title: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cx(
        "relative rounded-2xl border border-border bg-[rgb(var(--surface-rgb)/0.85)] shadow-lg backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden className="console-dots shrink-0">
            <i />
            <i />
            <i />
          </span>
          <p className="truncate font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-fg-subtle">{title}</p>
        </div>
        {meta && <div className="shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg-subtle">{meta}</div>}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/** Small mono status label with a dot, e.g. "● 4 workstreams". */
export function Signal({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "success" | "warning" }) {
  const dot = tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-accent";
  const text = tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-accent";
  return (
    <span className={cx("inline-flex items-center gap-1.5", text)}>
      <span aria-hidden className={cx("h-1.5 w-1.5 rounded-full", dot)} />
      {children}
    </span>
  );
}
