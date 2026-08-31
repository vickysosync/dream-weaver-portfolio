import { whyPoints } from "@/lib/data";
import { useData } from "@/lib/store";
import { Check } from "../icons";
import { Counter, Reveal } from "../ui";

export function WhyUs() {
  const { about } = useData();

  return (
    <section className="section-pad">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="relative">
            <img
              src={about.image}
              alt="The Dream Factory Events design team planning an event concept"
              loading="lazy"
              width={1200}
              height={1400}
              className="w-full rounded-3xl border border-border object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-8 -right-6 h-48 w-48 rounded-full opacity-50 blur-3xl"
              style={{ background: "var(--gradient-glow)" }}
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <p className="eyebrow">Why Dream Factory</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Why Clients Choose <span className="text-gradient">Dream Factory</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground">
              One team, one accountability line — concept, fabrication, decor,
              vendors and event-day execution handled end to end from Pune.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {whyPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {about.stats.map((s) => (
                <div key={s.label} className="glass-card rounded-2xl p-5 text-center">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="font-display text-3xl text-gold">
                      <Counter value={s.value} suffix={s.suffix} />
                    </span>
                    <span className="mt-2 block text-xs text-muted-foreground">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
