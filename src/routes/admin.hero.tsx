import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Panel } from "@/components/admin/kit";
import { Button, Field, inputClass } from "@/components/ui";
import { useData } from "@/lib/store";

export const Route = createFileRoute("/admin/hero")({
  head: () => ({
    meta: [
      { title: "Hero Banner | Dream Factory Events Admin" },
      { name: "description", content: "Update the homepage hero banner content." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Hero Banner | Dream Factory Events Admin" },
      { property: "og:description", content: "Update the homepage hero." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminHero,
});

function AdminHero() {
  const { hero, setHero } = useData();
  const [draft, setDraft] = useState(hero);
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof draft) => (e: { target: { value: string } }) =>
    setDraft((d) => ({ ...d, [k]: e.target.value }));

  return (
    <AdminLayout title="Hero Banner" description="Edit the homepage hero and preview it live.">
      <div className="grid gap-8 xl:grid-cols-2">
        <Panel>
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setHero(draft);
              setSaved(true);
              window.setTimeout(() => setSaved(false), 4000);
            }}
          >
            <Field label="Eyebrow" htmlFor="h-eyebrow">
              <input id="h-eyebrow" className={inputClass} value={draft.eyebrow} onChange={set("eyebrow")} />
            </Field>
            <Field label="Hero Title" htmlFor="h-title">
              <input id="h-title" className={inputClass} value={draft.title} onChange={set("title")} />
            </Field>
            <Field label="Highlighted Word" htmlFor="h-hl">
              <input id="h-hl" className={inputClass} value={draft.highlight} onChange={set("highlight")} />
            </Field>
            <Field label="Description" htmlFor="h-desc">
              <textarea id="h-desc" rows={4} className={inputClass} value={draft.description} onChange={set("description")} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Primary CTA" htmlFor="h-cta1">
                <input id="h-cta1" className={inputClass} value={draft.primaryCta} onChange={set("primaryCta")} />
              </Field>
              <Field label="Secondary CTA" htmlFor="h-cta2">
                <input id="h-cta2" className={inputClass} value={draft.secondaryCta} onChange={set("secondaryCta")} />
              </Field>
            </div>
            <Field label="Hero Image URL" htmlFor="h-img">
              <input id="h-img" className={inputClass} value={draft.image} onChange={set("image")} />
            </Field>
            <div className="flex items-center gap-4">
              <Button type="submit">Save Hero</Button>
              {saved ? <span className="text-sm text-success">Hero updated.</span> : null}
            </div>
          </form>
        </Panel>

        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            Live Preview
          </p>
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img
              src={draft.image}
              alt="Hero preview"
              loading="lazy"
              className="h-96 w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_top,var(--background)_8%,color-mix(in_oklab,var(--background)_55%,transparent))]"
            />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="eyebrow">{draft.eyebrow}</p>
              <p className="mt-3 font-display text-2xl leading-tight">
                {draft.title} <span className="text-gradient">{draft.highlight}</span>
              </p>
              <p className="mt-3 line-clamp-3 text-xs text-muted-foreground">
                {draft.description}
              </p>
              <div className="mt-4 flex gap-3 text-xs">
                <span className="rounded-full bg-brand px-4 py-2 font-semibold">
                  {draft.primaryCta}
                </span>
                <span className="rounded-full border border-border px-4 py-2">
                  {draft.secondaryCta}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
