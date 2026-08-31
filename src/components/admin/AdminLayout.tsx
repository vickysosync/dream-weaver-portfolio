import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useData } from "@/lib/store";
import { Close, Menu } from "../icons";
import { Button, cn } from "../ui";

const nav = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/portfolio", label: "Portfolio" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/enquiries", label: "Enquiries" },
  { to: "/admin/hero", label: "Hero Banner" },
  { to: "/admin/about", label: "About" },
  { to: "/admin/settings", label: "Settings" },
] as const;

export function AdminLayout({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { isAuthed, hydrated, logout } = useData();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (hydrated && !isAuthed) navigate({ to: "/admin/login" });
  }, [hydrated, isAuthed, navigate]);

  if (!hydrated || !isAuthed) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Checking admin session…
      </div>
    );
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="px-6 py-6">
        <Link to="/" className="block leading-none">
          <span className="font-display text-base font-bold tracking-[0.18em]">
            DREAM FACTORY
          </span>
          <span className="mt-1 block text-[0.55rem] tracking-[0.5em] text-gold">
            EVENTS
          </span>
        </Link>
        <p className="mt-3 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
          Admin Panel
        </p>
      </div>
      <nav className="flex-1 space-y-1 px-3" aria-label="Admin navigation">
        {nav.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            onClick={() => setOpen(false)}
            className="block rounded-lg px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground data-[status=active]:bg-brand data-[status=active]:text-primary-foreground"
          >
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="space-y-2 px-4 py-6">
        <Link
          to="/"
          className="block rounded-lg px-4 py-2.5 text-sm text-muted-foreground hover:text-gold"
        >
          View Website
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            logout();
            navigate({ to: "/admin/login" });
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-surface/40 lg:sticky lg:top-0 lg:block lg:h-screen">
        {sidebar}
      </aside>

      <div className="flex items-center justify-between border-b border-border px-5 py-4 lg:hidden">
        <span className="font-display text-sm tracking-[0.18em]">DREAM FACTORY</span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open admin menu"
          className="rounded-md p-2"
        >
          <Menu />
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur"
          />
          <div className="absolute inset-y-0 left-0 w-72 border-r border-border bg-surface">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close admin menu"
              className="absolute right-3 top-4 rounded-md p-2"
            >
              <Close />
            </button>
            {sidebar}
          </div>
        </div>
      ) : null}

      <main className="min-w-0 flex-1 px-5 py-8 lg:px-10 lg:py-12">
        <div
          className={cn(
            "mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
          )}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl">{title}</h1>
            {description ? (
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions}
        </div>
        {children}
      </main>
    </div>
  );
}
