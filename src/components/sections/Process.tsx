import { processSteps } from "@/lib/data";
import { Reveal, SectionHeading } from "../ui";

export function Process() {
  return (
    <section className="section-pad relative overflow-hidden bg-surface/30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-[40rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The Experience"
            title="From Concept to Curtain Call"
            subtitle="A five-step journey that keeps your event creative on paper and calm on the ground."
          />
        </Reveal>

        <ol className="mt-16 grid gap-8 lg:grid-cols-5">
          {processSteps.map((s, i) => (
            <Reveal key={s.no} delay={i * 100}>
              <li className="relative h-full lg:pt-10">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-3 hidden h-px w-full bg-border lg:block"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 hidden h-3 w-3 rounded-full bg-brand lg:block"
                />
                <div className="flex gap-4 lg:block">
                  <span className="font-display text-3xl text-gold">{s.no}</span>
                  <div>
                    <h3 className="text-lg font-semibold lg:mt-3">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
