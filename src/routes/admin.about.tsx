import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Panel } from "@/components/admin/kit";
import { Button, Field, inputClass } from "@/components/ui";
import { useData } from "@/lib/store";

export const Route = createFileRoute("/admin/about")({
  head: () => ({
    meta: [
      { title: "About Section | Dream Factory Events Admin" },
      { name: "description", content: "Edit the about section content and statistics." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "About Section | Dream Factory Events Admin" },
      { property: "og:description", content: "Edit the about section." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminAbout,
});

function AdminAbout() {
  const { about, setAbout } = useData();
  const [draft, setDraft] = useState(about);
  const [saved, setSaved] = useState(false);

  return (
    <AdminLayout title="About Section" description="Highlights and statistics shown on the website.">
      <Panel>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setAbout(draft);
            setSaved(true);
            window.setTimeout(() => setSaved(false), 4000);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Label" htmlFor="a-label">
              <input
                id="a-label"
                className={inputClass}
                value={draft.label}
                onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              />
            </Field>
            <Field label="About Image URL" htmlFor="a-img">
              <input
                id="a-img"
                className={inputClass}
                value={draft.image}
                onChange={(e) => setDraft({ ...draft, image: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Heading" htmlFor="a-head">
            <input
              id="a-head"
              className={inputClass}
              value={draft.heading}
              onChange={(e) => setDraft({ ...draft, heading: e.target.value })}
            />
          </Field>
          <Field label="Description" htmlFor="a-desc">
            <textarea
              id="a-desc"
              rows={4}
              className={inputClass}
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            />
          </Field>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Highlights
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {draft.highlights.map((h, i) => (
                <div key={i} className="space-y-3 rounded-xl border border-border p-4">
                  <input
                    aria-label={`Highlight ${i + 1} title`}
                    className={inputClass}
                    value={h.title}
                    onChange={(e) => {
                      const next = [...draft.highlights];
                      next[i] = { ...h, title: e.target.value };
                      setDraft({ ...draft, highlights: next });
                    }}
                  />
                  <textarea
                    aria-label={`Highlight ${i + 1} text`}
                    rows={2}
                    className={inputClass}
                    value={h.text}
                    onChange={(e) => {
                      const next = [...draft.highlights];
                      next[i] = { ...h, text: e.target.value };
                      setDraft({ ...draft, highlights: next });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Statistics
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {draft.stats.map((s, i) => (
                <div key={i} className="space-y-3 rounded-xl border border-border p-4">
                  <input
                    aria-label={`Stat ${i + 1} label`}
                    className={inputClass}
                    value={s.label}
                    onChange={(e) => {
                      const next = [...draft.stats];
                      next[i] = { ...s, label: e.target.value };
                      setDraft({ ...draft, stats: next });
                    }}
                  />
                  <div className="flex gap-2">
                    <input
                      aria-label={`Stat ${i + 1} value`}
                      type="number"
                      className={inputClass}
                      value={s.value}
                      onChange={(e) => {
                        const next = [...draft.stats];
                        next[i] = { ...s, value: Number(e.target.value) || 0 };
                        setDraft({ ...draft, stats: next });
                      }}
                    />
                    <input
                      aria-label={`Stat ${i + 1} suffix`}
                      className={`${inputClass} w-20`}
                      value={s.suffix}
                      onChange={(e) => {
                        const next = [...draft.stats];
                        next[i] = { ...s, suffix: e.target.value };
                        setDraft({ ...draft, stats: next });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit">Save About Section</Button>
            {saved ? <span className="text-sm text-success">About updated.</span> : null}
          </div>
        </form>
      </Panel>
    </AdminLayout>
  );
}
