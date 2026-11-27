import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { NAV_ITEMS, hero } from "@/lib/site";
import { Container, ExternalLink, GitHubIcon, LinkedInIcon, LogoMark } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-subtle">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <LogoMark />
              <span className="font-display font-semibold text-fg">{hero.name}</span>
            </div>
            <p className="mt-3 text-sm text-fg-muted">
              {hero.title} · {hero.location.replace(", USA", "")}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm sm:grid-cols-3">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <Link href={`/#${n.id}`} className="text-fg-muted transition-colors hover:text-fg">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-6 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            © {new Date().getFullYear()} {hero.name}. Built with Next.js and Tailwind CSS.
          </p>
          <div className="flex items-center gap-2">
            <ExternalLink href={hero.linkedin} aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-lg text-fg-muted transition-colors hover:bg-surface hover:text-fg">
              <LinkedInIcon />
            </ExternalLink>
            <ExternalLink href={hero.github} aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-lg text-fg-muted transition-colors hover:bg-surface hover:text-fg">
              <GitHubIcon />
            </ExternalLink>
            <a
              href="#top"
              className="ml-2 inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-sm font-medium text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
            >
              <ArrowUp className="h-4 w-4" aria-hidden />
              Back to top
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
