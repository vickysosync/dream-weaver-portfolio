import { images } from "@/lib/data";
import { Reveal } from "../ui";

const tiles = [
  { src: images.heroEvent, alt: "Wedding reception stage with floral chandeliers", span: "sm:col-span-2 sm:row-span-2" },
  { src: images.serviceSocial, alt: "Birthday balloon and floral decor setup", span: "" },
  { src: images.showcaseEngagement, alt: "Engagement mandap with drapes and candles", span: "sm:row-span-2" },
  { src: images.serviceCorporate, alt: "Corporate conference stage with LED backdrop", span: "" },
  { src: images.serviceRetail, alt: "Retail showroom launch entrance decor", span: "" },
  { src: images.showcaseFestive, alt: "Festive marigold and lantern installation", span: "sm:col-span-2" },
];

export function Showcase() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-md text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Your Occasion.
              <br />
              <span className="text-gradient">Our Canvas.</span>
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Stage decoration, birthday styling, floral arrangements, corporate
              setups, retail launches and festive installations.
            </p>
          </div>
        </Reveal>

        <div className="grid auto-rows-[11rem] grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[13rem]">
          {tiles.map((t, i) => (
            <Reveal key={t.alt} delay={i * 70} className={t.span}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border">
                <img
                  src={t.src}
                  alt={t.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
