import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { Intro } from "@/components/sections/Intro";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { CtaBanner } from "@/components/sections/CtaBanner";

const title = "About Dream Factory Events | Event Designers in Pune";
const description =
  "Meet Dream Factory Events — a Pune event management and decor studio handling concepts, fabrication, styling, vendors and full event execution.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About Us"
        title="A Pune Studio Built for Creative Event Production"
        subtitle="Themed fabrication, entertainment curation, vendor coordination, styling and experiential installations — delivered by one accountable team."
      />
      <Intro />
      <WhyUs />
      <Process />
      <CtaBanner />
    </SiteLayout>
  );
}
