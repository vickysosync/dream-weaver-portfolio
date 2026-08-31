import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { Services } from "@/components/sections/Services";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Process } from "@/components/sections/Process";

const title = "Event Services | Dream Factory Events Pune";
const description =
  "Social celebrations, retail and product launches, large-scale venue decor and corporate events — full-service event styling and production in Pune.";

export const Route = createFileRoute("/services")({
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
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Services"
        title="What We Create"
        subtitle="From personal celebrations to large-scale brand experiences."
      />
      <Services />
      <Process />
      <CtaBanner />
    </SiteLayout>
  );
}
