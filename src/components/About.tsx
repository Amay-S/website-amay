import { CheckCircle2, MapPin } from "lucide-react";
import { hero } from "@/lib/site";
import { Section, cardClass } from "./ui";

export default function About() {
  const more = hero.highlights.filter((h) => !h.featured);

  return (
    <Section id="about" eyebrow="About" title="Where product vision meets engineering execution">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <figure data-reveal className="lg:col-span-5">
          <div className={`${cardClass} overflow-hidden p-1.5`}>
            <picture>
              <source media="(max-width: 640px)" srcSet={hero.photo.srcSmall} />
              <img
                src={hero.photo.src}
                width={hero.photo.width}
                height={hero.photo.height}
                alt={hero.photo.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] h-auto w-full rounded-xl object-cover object-[50%_40%] lg:aspect-[4/4.4]"
              />
            </picture>
          </div>
          <figcaption className="mt-3 flex items-center gap-1.5 font-mono text-xs text-fg-subtle">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Based in {hero.location.replace(", USA", "")}
          </figcaption>
        </figure>

        <div className="lg:col-span-7">
          <p data-reveal className="max-w-[65ch] text-lead text-fg-muted">
            {hero.tagline}
          </p>

          <h3 data-reveal className="mt-10 font-mono text-micro font-medium uppercase text-fg-subtle">
            Focus areas
          </h3>
          <ul data-reveal className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {hero.focusAreas.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[0.95rem] text-fg">
                <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent" aria-hidden />
                {f}
              </li>
            ))}
          </ul>

          <h3 data-reveal className="mt-10 font-mono text-micro font-medium uppercase text-fg-subtle">
            More proof points
          </h3>
          <dl data-reveal className="mt-4 grid grid-cols-2 gap-3">
            {more.map((h) => (
              <div key={h.label} className={`${cardClass} flex flex-col p-4`}>
                <dt className="order-2 mt-1 text-sm font-medium text-fg">{h.label}</dt>
                <dd className="order-1 font-display text-2xl font-semibold tracking-tight text-fg">{h.value}</dd>
                <dd className="order-3 mt-0.5 text-xs text-fg-subtle">{h.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
