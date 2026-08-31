import { Link } from "@tanstack/react-router";
import { useData } from "@/lib/store";
import { Mail, MapPin, Phone } from "./icons";

export function Footer() {
  const { settings } = useData();

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <p className="font-display text-lg font-bold tracking-[0.18em]">
            DREAM FACTORY
          </p>
          <p className="mt-1 text-[0.6rem] tracking-[0.5em] text-gold">EVENTS</p>
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">
            Creating celebrations, experiences and unforgettable moments.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Instagram
            </a>
            <a
              href={settings.facebook}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Facebook
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-sm font-semibold uppercase tracking-widest">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/services", label: "Services" },
              { to: "/portfolio", label: "Portfolio" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest">Services</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>Private Celebrations</li>
            <li>Retail Launches</li>
            <li>Venue Decor</li>
            <li>Corporate Events</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
              <span>
                <a href={`tel:${settings.phone1.replace(/\s/g, "")}`} className="hover:text-gold">
                  {settings.phone1}
                </a>
                <br />
                <a href={`tel:${settings.phone2.replace(/\s/g, "")}`} className="hover:text-gold">
                  {settings.phone2}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
              <a href={`mailto:${settings.email}`} className="hover:text-gold">
                {settings.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
              <span>{settings.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row lg:px-8">
          <p>
            © {new Date().getFullYear()} {settings.businessName}. All rights reserved.
          </p>
          <Link
            to="/admin/login"
            className="text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
