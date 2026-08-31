import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal, Panel } from "@/components/admin/kit";
import { Edit, Plus, Star, Trash } from "@/components/icons";
import { Button, Field, inputClass } from "@/components/ui";
import type { Testimonial } from "@/lib/data";
import { useData } from "@/lib/store";

export const Route = createFileRoute("/admin/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials | Dream Factory Events Admin" },
      { name: "description", content: "Manage client testimonials shown on the site." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Testimonials | Dream Factory Events Admin" },
      { property: "og:description", content: "Manage client testimonials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminTestimonials,
});

const blank: Testimonial = {
  id: 0,
  name: "",
  eventType: "",
  quote: "",
  rating: 5,
  visible: true,
};

function AdminTestimonials() {
  const { testimonials, saveTestimonial, deleteTestimonial } = useData();
  const [draft, setDraft] = useState<Testimonial | null>(null);

  const set = <K extends keyof Testimonial>(k: K, v: Testimonial[K]) =>
    setDraft((d) => (d ? { ...d, [k]: v } : d));

  return (
    <AdminLayout
      title="Testimonials"
      description="Demo client quotes displayed in the testimonial carousel."
      actions={
        <Button onClick={() => setDraft({ ...blank })}>
          <Plus className="h-4 w-4" /> Add Testimonial
        </Button>
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((t) => (
          <Panel key={t.id}>
            <div className="flex gap-1 text-gold">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">“{t.quote}”</p>
            <p className="mt-4 text-sm font-semibold">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.eventType}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setDraft(t)}>
                <Edit className="h-4 w-4" /> Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => saveTestimonial({ ...t, visible: !t.visible })}
              >
                {t.visible ? "Hide" : "Show"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive"
                onClick={() => {
                  if (window.confirm(`Delete testimonial by ${t.name}?`))
                    deleteTestimonial(t.id);
                }}
              >
                <Trash className="h-4 w-4" /> Delete
              </Button>
            </div>
          </Panel>
        ))}
      </div>

      <Modal
        open={!!draft}
        onClose={() => setDraft(null)}
        title={draft?.id ? "Edit Testimonial" : "Add Testimonial"}
      >
        {draft ? (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              saveTestimonial(draft);
              setDraft(null);
            }}
          >
            <Field label="Client Name" htmlFor="t-name">
              <input
                id="t-name"
                required
                className={inputClass}
                value={draft.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </Field>
            <Field label="Event Type" htmlFor="t-type">
              <input
                id="t-type"
                className={inputClass}
                value={draft.eventType}
                onChange={(e) => set("eventType", e.target.value)}
              />
            </Field>
            <Field label="Testimonial" htmlFor="t-quote">
              <textarea
                id="t-quote"
                rows={4}
                className={inputClass}
                value={draft.quote}
                onChange={(e) => set("quote", e.target.value)}
              />
            </Field>
            <Field label="Rating (1-5)" htmlFor="t-rating">
              <input
                id="t-rating"
                type="number"
                min={1}
                max={5}
                className={inputClass}
                value={draft.rating}
                onChange={(e) =>
                  set("rating", Math.min(5, Math.max(1, Number(e.target.value) || 1)))
                }
              />
            </Field>
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={draft.visible}
                onChange={(e) => set("visible", e.target.checked)}
                className="h-4 w-4 accent-[var(--primary)]"
              />
              Visible on website
            </label>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button type="submit">Save Testimonial</Button>
            </div>
          </form>
        ) : null}
      </Modal>
    </AdminLayout>
  );
}
