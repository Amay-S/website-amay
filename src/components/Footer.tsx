import { ArrowUp } from "lucide-react";
import { hero } from "@/lib/site";
import { Container, ExternalLink, GitHubIcon, LinkedInIcon } from "./ui";

const link = "rounded-md text-fg-muted transition-colors hover:text-fg";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center justify-between gap-3 py-6 text-sm sm:flex-row">
        <p className="text-fg-subtle">
          © {new Date().getFullYear()} {hero.name}
        </p>
        <nav aria-label="Footer" className="flex items-center gap-5">
          <ExternalLink href={hero.linkedin} className={`${link} inline-flex items-center gap-1.5`}>
            <LinkedInIcon className="h-3.5 w-3.5" />
            LinkedIn
          </ExternalLink>
          <ExternalLink href={hero.github} className={`${link} inline-flex items-center gap-1.5`}>
            <GitHubIcon className="h-3.5 w-3.5" />
            GitHub
          </ExternalLink>
          <ExternalLink href={hero.resumePath} className={link}>
            Resume
          </ExternalLink>
          <a href="#top" aria-label="Back to top" title="Back to top" className="grid h-8 w-8 place-items-center rounded-lg border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg">
            <ArrowUp className="h-4 w-4" aria-hidden />
          </a>
        </nav>
      </Container>
    </footer>
  );
}
