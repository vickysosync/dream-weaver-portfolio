import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal, Panel } from "@/components/admin/kit";
import { Edit, Plus, Trash } from "@/components/icons";
import { Button, Field, inputClass } from "@/components/ui";
import type { Service } from "@/lib/data";
import { useData } from "@/lib/store";

export const Route = createFileRoute("/admin/services")({
  head: () => ({
    meta: [
      { title: "Services Manager | Dream Factory Events Admin" },
      { name: "description", content: "Add, edit and hide service cards." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Services Manager | Dream Factory Events Admin" },
      { property: "og:description", content: "Manage website services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminServices,
});

const blank: Service = {
  id: 0,
  title: "",
  category: "",
  description: "",
  image: "",
  visible: true,
};

function AdminServices() {
  const { services, saveService, deleteService } = useData();
  const [draft, setDraft] = useState<Service | null>(null);

  const set = <K extends keyof Service>(k: K, v: Service[K]) =>
    setDraft((d) => (d ? { ...d, [k]: v } : d));

  return (
    <AdminLayout
      title="Services"
      description="Control the four service verticals shown on the website."
      actions={
        <Button onClick={() => setDraft({ ...blank })}>
          <Plus className="h-4 w-4" /> Add Service
        </Button>
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((s) => (
          <Panel key={s.id}>
            <div className="flex gap-4">
              {s.image ? (
                <img
                  src={s.image}
                  alt=""
                  loading="lazy"
                  className="h-24 w-28 shrink-0 rounded-xl object-cover"
                />
              ) : null}
              <div className="min-w-0">
                <p className="eyebrow">{s.category}</p>
                <h2 className="mt-1 text-lg font-semibold">{s.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {s.description}
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setDraft(s)}>
                <Edit className="h-4 w-4" /> Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => saveService({ ...s, visible: !s.visible })}
              >
                {s.visible ? "Hide" : "Show"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive"
                onClick={() => {
                  if (window.confirm(`Delete “${s.title}”?`)) deleteService(s.id);
                }}
              >
                <Trash className="h-4 w-4" /> Delete
              </Button>
              <span className="text-xs text-muted-foreground">
                {s.visible ? "Visible" : "Hidden"}
              </span>
            </div>
          </Panel>
        ))}
      </div>

      <Modal
        open={!!draft}
        onClose={() => setDraft(null)}
        title={draft?.id ? "Edit Service" : "Add Service"}
      >
        {draft ? (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              saveService(draft);
              setDraft(null);
            }}
          >
            <Field label="Title" htmlFor="s-title">
              <input
                id="s-title"
                required
                className={inputClass}
                value={draft.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </Field>
            <Field label="Category Label" htmlFor="s-cat">
              <input
                id="s-cat"
                className={inputClass}
                value={draft.category}
                onChange={(e) => set("category", e.target.value)}
              />
            </Field>
            <Field label="Description" htmlFor="s-desc">
              <textarea
                id="s-desc"
                rows={3}
                className={inputClass}
                value={draft.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </Field>
            <Field label="Image URL" htmlFor="s-img">
              <input
                id="s-img"
                className={inputClass}
                value={draft.image}
                onChange={(e) => set("image", e.target.value)}
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
              <Button type="submit">Save Service</Button>
            </div>
          </form>
        ) : null}
      </Modal>
    </AdminLayout>
  );
}
