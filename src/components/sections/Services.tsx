import { useData } from "@/lib/store";
import { ArrowRight } from "../icons";
import { Reveal, SectionHeading } from "../ui";
import { Link } from "@tanstack/react-router";

export function Services() {
  const { services } = useData();
  const visible = services.filter((s) => s.visible);

  return (
    <section className="section-pad relative bg-surface/30">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            title="What We Create"
            subtitle="From personal celebrations to large-scale brand experiences."
          />
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {visible.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-violet/60 hover:glow-ring">
                <div className="relative h-60 overflow-hidden sm:h-72">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(to_top,var(--card),transparent_65%)]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundImage: "var(--gradient-brand)" }}
                  />
                </div>
                <div className="p-7">
                  <p className="eyebrow">{s.category}</p>
                  <h3 className="mt-3 text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>
                  <Link
                    to="/services"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold"
                  >
                    Explore Service
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
