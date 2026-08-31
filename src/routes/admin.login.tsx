import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Eye, EyeOff } from "@/components/icons";
import { Button, Field, inputClass } from "@/components/ui";
import { DEMO_EMAIL, DEMO_PASSWORD, useData } from "@/lib/store";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Dream Factory Events" },
      {
        name: "description",
        content: "Secure admin access for managing the Dream Factory Events website.",
      },
      { property: "og:title", content: "Admin Login | Dream Factory Events" },
      {
        property: "og:description",
        content: "Admin access for the Dream Factory Events portfolio website.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { login, isAuthed, hydrated } = useData();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && isAuthed) navigate({ to: "/admin/dashboard" });
  }, [hydrated, isAuthed, navigate]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      setError("");
      navigate({ to: "/admin/dashboard" });
    } else {
      setError("Invalid email or password. Please try the demo credentials below.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative w-full max-w-md">
        <div className="text-center">
          <p className="font-display text-xl font-bold tracking-[0.2em]">
            DREAM FACTORY
          </p>
          <p className="mt-1 text-[0.6rem] tracking-[0.55em] text-gold">EVENTS</p>
        </div>

        <form onSubmit={onSubmit} className="glass-card mt-8 rounded-3xl p-8">
          <h1 className="text-2xl">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage portfolio, services and enquiries.
          </p>

          {error ? (
            <p
              role="alert"
              className="mt-6 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive-foreground"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-6 space-y-5">
            <Field label="Email" htmlFor="admin-email">
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dreamfactoryevents.co"
              />
            </Field>
            <Field label="Password" htmlFor="admin-password">
              <div className="relative">
                <input
                  id="admin-password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  className={inputClass}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>
          </div>

          <Button type="submit" size="lg" className="mt-7 w-full">
            Login
          </Button>

          <div className="mt-6 rounded-xl border border-border bg-surface-2/50 p-4 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Demo credentials</p>
            <p className="mt-1">Email: {DEMO_EMAIL}</p>
            <p>Password: {DEMO_PASSWORD}</p>
          </div>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link to="/" className="text-muted-foreground hover:text-gold">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
