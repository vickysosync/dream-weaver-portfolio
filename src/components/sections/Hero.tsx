import { useData } from "@/lib/store";
import { ArrowRight, Phone } from "../icons";
import { ButtonLink } from "../ui";

export function Hero() {
  const { hero, settings } = useData();

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      <img
        src={hero.image}
        alt="Luxury event stage decoration by Dream Factory Events"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,var(--background)_4%,color-mix(in_oklab,var(--background)_82%,transparent)_45%,color-mix(in_oklab,var(--background)_60%,transparent)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 h-96 w-96 rounded-full opacity-50 blur-3xl animate-float"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full opacity-40 blur-3xl animate-float"
        style={{ background: "var(--gradient-glow)", animationDelay: "2.5s" }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-36 lg:px-8">
        <p className="eyebrow animate-fade-in">{hero.eyebrow}</p>
        <h1 className="mt-6 max-w-4xl text-4xl leading-[1.06] animate-fade-up sm:text-6xl lg:text-7xl">
          {hero.title} <span className="text-gradient">{hero.highlight}</span>
        </h1>
        <p
          className="mt-7 max-w-2xl text-base text-muted-foreground animate-fade-up sm:text-lg"
          style={{ animationDelay: "120ms" }}
        >
          {hero.description}
        </p>
        <div
          className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up"
          style={{ animationDelay: "220ms" }}
        >
          <ButtonLink to="/portfolio" size="lg">
            {hero.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink to="/contact" variant="outline" size="lg">
            {hero.secondaryCta}
          </ButtonLink>
          <a
            href={`tel:${settings.phone1.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
          >
            <Phone className="h-4 w-4" />
            {settings.phone1}
          </a>
        </div>
      </div>
    </section>
  );
}
