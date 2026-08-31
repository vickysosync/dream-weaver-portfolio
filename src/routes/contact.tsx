import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { ContactSection } from "@/components/sections/ContactSection";

const title = "Contact Dream Factory Events | Event Enquiry in Pune";
const description =
  "Share your occasion, date and venue with Dream Factory Events in Kharadi, Pune. Call +91 84466 11477 or send an event enquiry online.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Tell Us About Your Event"
        subtitle="Our Kharadi studio is open for enquiries across Pune and beyond."
      />
      <ContactSection />
    </SiteLayout>
  );
}
