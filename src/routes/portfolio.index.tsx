import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { categories } from "@/lib/data";
import { useData } from "@/lib/store";

const title = "Event Portfolio | Dream Factory Events Pune";
const description =
  "Browse birthdays, engagements, weddings, corporate events, retail launches, festive decor and mall installations designed by Dream Factory Events.";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { projects } = useData();

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Portfolio"
        title="Our Work, Your Inspiration"
        subtitle="Every setup begins with an idea. Every finished space becomes a story."
      />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <PortfolioGrid projects={projects} categories={categories} />
        </div>
      </section>
      <CtaBanner />
    </SiteLayout>
  );
}
