import { images } from "@/lib/data";
import { useData } from "@/lib/store";
import { ArrowRight, Phone } from "../icons";
import { ButtonLink, Reveal } from "../ui";

export function CtaBanner() {
  const { settings } = useData();

  return (
    <section className="relative overflow-hidden">
      <img
        src={images.ctaEvent}
        alt="Elegant banquet hall styled for a celebration"
        loading="lazy"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--background)_10%,color-mix(in_oklab,var(--background)_70%,transparent))]"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Let's Begin</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Have an Event in Mind?{" "}
              <span className="text-gradient">Let's Make It Extraordinary.</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground">
              Tell us your idea, occasion or venue. We'll help turn it into an
              experience worth remembering.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink to="/contact" size="lg">
                Start Your Event <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={`tel:${settings.phone1.replace(/\s/g, "")}`}
                variant="outline"
                size="lg"
              >
                <Phone className="h-4 w-4" /> Call Us
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
