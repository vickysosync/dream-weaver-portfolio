import { useData } from "@/lib/store";
import { WhatsApp } from "./icons";

export function WhatsAppButton() {
  const { settings } = useData();
  const href = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    "Hello Dream Factory Events, I would like to discuss an event.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground glow-ring transition-transform duration-300 hover:-translate-y-1"
    >
      <WhatsApp className="h-5 w-5" />
      <span className="hidden sm:inline">Plan Your Event</span>
    </a>
  );
}
