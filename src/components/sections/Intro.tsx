import { useData } from "@/lib/store";
import { Sparkle } from "../icons";
import { Reveal, SectionHeading } from "../ui";

export function Intro() {
  const { about } = useData();

  return (
    <section className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={about.label}
            title={about.heading}
            subtitle={about.description}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 90}>
              <article className="glass-card h-full rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1.5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-primary-foreground">
                  <Sparkle className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{h.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{h.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
