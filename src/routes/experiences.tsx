import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { Process } from "@/components/sections/Process";
import { Showcase } from "@/components/sections/Showcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";

const title = "Experiences | From Concept to Curtain Call — Dream Factory Events";
const description =
  "See how Dream Factory Events designs experiences: understand, imagine, design, create and execute every celebration in Pune.";

export const Route = createFileRoute("/experiences")({
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
  component: ExperiencesPage,
});

function ExperiencesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Experiences"
        title="From Concept to Curtain Call"
        subtitle="The five-step journey behind every Dream Factory event."
      />
      <Process />
      <Showcase />
      <Testimonials />
      <CtaBanner />
    </SiteLayout>
  );
}
