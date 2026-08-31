import { useState } from "react";
import { useData } from "@/lib/store";
import { ArrowLeft, ArrowRight, Star } from "../icons";
import { Button, Reveal, SectionHeading, cn } from "../ui";

export function Testimonials() {
  const { testimonials } = useData();
  const list = testimonials.filter((t) => t.visible);
  const [i, setI] = useState(0);
  const current = list[Math.min(i, Math.max(list.length - 1, 0))];

  if (!current) return null;

  return (
    <section className="section-pad bg-surface/30">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Client Words"
            title="Loved by the People We Celebrate With"
            subtitle="Demo testimonials shown for this portfolio website."
          />
        </Reveal>

        <Reveal delay={100}>
          <figure className="glass-card mt-12 rounded-3xl p-8 text-center sm:p-12">
            <div className="flex justify-center gap-1 text-gold">
              {Array.from({ length: current.rating }).map((_, s) => (
                <Star key={s} className="h-4 w-4" />
              ))}
            </div>
            <blockquote className="mt-6 font-display text-xl leading-relaxed sm:text-2xl">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold">{current.name}</span>
              <span className="block text-muted-foreground">{current.eventType}</span>
            </figcaption>

            <div className="mt-8 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                aria-label="Previous testimonial"
                onClick={() => setI((p) => (p - 1 + list.length) % list.length)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                {list.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    aria-label={`Show testimonial ${idx + 1}`}
                    onClick={() => setI(idx)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      idx === i ? "w-7 bg-gold" : "w-2 bg-border",
                    )}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                aria-label="Next testimonial"
                onClick={() => setI((p) => (p + 1) % list.length)}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
