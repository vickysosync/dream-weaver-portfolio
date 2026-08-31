import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { FeaturedPortfolio } from "@/components/sections/FeaturedPortfolio";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { Showcase } from "@/components/sections/Showcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ContactSection } from "@/components/sections/ContactSection";

const title = "Dream Factory Events | Premium Event Planning & Decor in Pune";
const description =
  "Dream Factory Events creates unforgettable celebrations, corporate events, retail launches and large-scale venue experiences in Pune.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <Intro />
      <Services />
      <FeaturedPortfolio />
      <Process />
      <WhyUs />
      <Showcase />
      <Testimonials />
      <CtaBanner />
      <ContactSection />
    </SiteLayout>
  );
}
