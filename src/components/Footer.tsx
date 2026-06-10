import data from "@/data/portfolioData.json";

export default function Footer() {
  const { hero } = data;
  return (
    <footer className="border-t border-[var(--color-border)] bg-transparent py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <p className="text-lg font-bold text-[var(--color-text-primary)]">
          AS<span className="text-[var(--color-accent)]">.</span>
        </p>
        <div className="flex gap-6">
          <a href={`mailto:${hero.email}`} className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]">Email</a>
          <a href={hero.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]">LinkedIn</a>
          <a href={hero.resumePath} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]">Resume</a>
        </div>
        <p className="text-xs text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} {hero.name}. Built with Next.js &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
