import { hero } from "@/lib/site";
import { Section } from "./ui";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Where product vision meets engineering execution">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="space-y-5 lg:col-span-7">
          {hero.about.map((p, i) => (
            <p key={i} className={i === 0 ? "max-w-[65ch] text-lead text-fg" : "max-w-[65ch] text-lead text-fg-muted"}>
              {p}
            </p>
          ))}
        </div>

        <aside data-reveal style={{ "--reveal-i": 1 } as React.CSSProperties} aria-labelledby="focus-title" className="lg:col-span-5">
          <div className="hud relative rounded-2xl border border-border bg-surface shadow-sm">
            <h3 id="focus-title" className="border-b border-border px-5 py-3.5 font-mono text-micro font-medium uppercase text-fg-subtle">
              Focus areas
            </h3>
            <ol className="divide-y divide-border">
              {hero.focusAreas.map((f, i) => (
                <li key={f} className="flex items-baseline gap-4 px-5 py-3">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[0.95rem] font-medium text-fg">{f}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </Section>
  );
}
