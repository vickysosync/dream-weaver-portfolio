import { useData } from "@/lib/store";
import { EnquiryForm } from "../EnquiryForm";
import { Mail, MapPin, Phone, WhatsApp } from "../icons";
import { Reveal } from "../ui";

export function ContactSection() {
  const { settings } = useData();

  return (
    <section className="section-pad" id="contact">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <Reveal>
          <div>
            <p className="eyebrow">Get in Touch</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
              Let's Plan Something <span className="text-gradient">Unforgettable</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Share your occasion, date and venue — we'll come back with concepts and
              a clear estimate.
            </p>

            <ul className="mt-9 space-y-6 text-sm">
              <li className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-violet">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold">{settings.businessName}</p>
                  <p className="mt-1 text-muted-foreground">{settings.address}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-violet">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <a
                    href={`tel:${settings.phone1.replace(/\s/g, "")}`}
                    className="block hover:text-gold"
                  >
                    {settings.phone1}
                  </a>
                  <a
                    href={`tel:${settings.phone2.replace(/\s/g, "")}`}
                    className="block hover:text-gold"
                  >
                    {settings.phone2}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-violet">
                  <Mail className="h-4 w-4" />
                </span>
                <a href={`mailto:${settings.email}`} className="hover:text-gold">
                  {settings.email}
                </a>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-violet">
                  <WhatsApp className="h-4 w-4" />
                </span>
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
                    "Hello Dream Factory Events, I would like to discuss an event.",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
