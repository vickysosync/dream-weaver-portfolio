import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Close, Menu } from "./icons";
import { ButtonLink, cn } from "./ui";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/experiences", label: "Experiences" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"
        aria-label="Main navigation"
      >
        <Link to="/" className="group leading-none" onClick={() => setOpen(false)}>
          <span className="block font-display text-lg font-bold tracking-[0.2em] sm:text-xl">
            DREAM FACTORY
          </span>
          <span className="mt-1 block text-[0.6rem] tracking-[0.55em] text-gold">
            EVENTS
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="relative text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ButtonLink to="/contact" size="sm" className="hidden sm:inline-flex">
            Plan Your Event
          </ButtonLink>
          <button
            type="button"
            className="rounded-md p-2 text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Menu className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background/97 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-5 py-3">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-md p-2"
            >
              <Close />
            </button>
          </div>
          <ul className="px-5 pb-6">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border py-4 text-base text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-5">
              <ButtonLink
                to="/contact"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Plan Your Event
              </ButtonLink>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
