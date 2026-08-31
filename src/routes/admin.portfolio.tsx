import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal, TableWrap, tdClass, thClass } from "@/components/admin/kit";
import { Edit, Plus, Star, Trash } from "@/components/icons";
import { Button, Field, inputClass } from "@/components/ui";
import { categories, type Project } from "@/lib/data";
import { useData } from "@/lib/store";

export const Route = createFileRoute("/admin/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio Manager | Dream Factory Events Admin" },
      { name: "description", content: "Add, edit and delete portfolio projects." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Portfolio Manager | Dream Factory Events Admin" },
      { property: "og:description", content: "Manage portfolio projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPortfolio,
});

const blank: Project = {
  id: 0,
  title: "",
  category: categories[0] ?? "Birthdays",
  location: "Pune",
  date: "",
  shortDescription: "",
  description: "",
  coverImage: "",
  galleryImages: [],
  services: [],
  featured: false,
};

function AdminPortfolio() {
  const { projects, saveProject, deleteProject, toggleFeatured } = useData();
  const [draft, setDraft] = useState<Project | null>(null);

  const set = <K extends keyof Project>(k: K, v: Project[K]) =>
    setDraft((d) => (d ? { ...d, [k]: v } : d));

  return (
    <AdminLayout
      title="Portfolio"
      description="Manage the projects shown across the website."
      actions={
        <Button onClick={() => setDraft({ ...blank })}>
          <Plus className="h-4 w-4" /> Add Project
        </Button>
      }
    >
      <TableWrap>
        <thead>
          <tr>
            <th className={thClass}>Project</th>
            <th className={thClass}>Category</th>
            <th className={thClass}>Location</th>
            <th className={thClass}>Date</th>
            <th className={thClass}>Featured</th>
            <th className={thClass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td className={tdClass}>
                <div className="flex items-center gap-3">
                  {p.coverImage ? (
                    <img
                      src={p.coverImage}
                      alt=""
                      loading="lazy"
                      className="h-12 w-16 rounded-md object-cover"
                    />
                  ) : null}
                  <span className="font-medium">{p.title}</span>
                </div>
              </td>
              <td className={tdClass}>{p.category}</td>
              <td className={tdClass}>{p.location}</td>
              <td className={tdClass}>{p.date}</td>
              <td className={tdClass}>
                <button
                  type="button"
                  onClick={() => toggleFeatured(p.id)}
                  aria-label={`Toggle featured for ${p.title}`}
                  className={p.featured ? "text-gold" : "text-muted-foreground/50"}
                >
                  <Star className="h-5 w-5" />
                </button>
              </td>
              <td className={tdClass}>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setDraft(p)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    aria-label={`Delete ${p.title}`}
                    onClick={() => {
                      if (window.confirm(`Delete “${p.title}”?`)) deleteProject(p.id);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrap>

      <Modal
        open={!!draft}
        onClose={() => setDraft(null)}
        wide
        title={draft?.id ? "Edit Project" : "Add Project"}
      >
        {draft ? (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              saveProject(draft);
              setDraft(null);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Project Title" htmlFor="p-title">
                <input
                  id="p-title"
                  required
                  className={inputClass}
                  value={draft.title}
                  onChange={(e) => set("title", e.target.value)}
                />
              </Field>
              <Field label="Category" htmlFor="p-cat">
                <select
                  id="p-cat"
                  className={inputClass}
                  value={draft.category}
                  onChange={(e) => set("category", e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Location" htmlFor="p-loc">
                <input
                  id="p-loc"
                  className={inputClass}
                  value={draft.location}
                  onChange={(e) => set("location", e.target.value)}
                />
              </Field>
              <Field label="Event Date" htmlFor="p-date">
                <input
                  id="p-date"
                  type="date"
                  className={inputClass}
                  value={draft.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </Field>
            </div>

            <Field label="Short Description" htmlFor="p-short">
              <input
                id="p-short"
                className={inputClass}
                value={draft.shortDescription}
                onChange={(e) => set("shortDescription", e.target.value)}
              />
            </Field>
            <Field label="Full Description" htmlFor="p-desc">
              <textarea
                id="p-desc"
                rows={4}
                className={inputClass}
                value={draft.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </Field>
            <Field label="Cover Image URL" htmlFor="p-cover">
              <input
                id="p-cover"
                className={inputClass}
                value={draft.coverImage}
                onChange={(e) => set("coverImage", e.target.value)}
                placeholder="https://…"
              />
            </Field>
            <Field label="Gallery Image URLs (comma separated)" htmlFor="p-gal">
              <textarea
                id="p-gal"
                rows={2}
                className={inputClass}
                value={draft.galleryImages.join(", ")}
                onChange={(e) =>
                  set(
                    "galleryImages",
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  )
                }
              />
            </Field>
            <Field label="Services Provided (comma separated)" htmlFor="p-serv">
              <input
                id="p-serv"
                className={inputClass}
                value={draft.services.join(", ")}
                onChange={(e) =>
                  set(
                    "services",
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  )
                }
              />
            </Field>

            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="h-4 w-4 accent-[var(--primary)]"
              />
              Featured project
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button type="submit">Save Project</Button>
            </div>
          </form>
        ) : null}
      </Modal>
    </AdminLayout>
  );
}
