import { categories } from "@/lib/data";
import { useData } from "@/lib/store";
import { PortfolioGrid } from "../PortfolioGrid";
import { ArrowRight } from "../icons";
import { ButtonLink, Reveal, SectionHeading } from "../ui";

export function FeaturedPortfolio() {
  const { projects } = useData();

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Portfolio"
            title="Our Work, Your Inspiration"
            subtitle="Every setup begins with an idea. Every finished space becomes a story."
          />
        </Reveal>

        <div className="mt-12">
          <PortfolioGrid projects={projects} categories={categories} limit={6} />
        </div>

        <div className="mt-14 text-center">
          <ButtonLink to="/portfolio" variant="outline" size="lg">
            View Full Portfolio <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
