import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Panel } from "@/components/admin/kit";
import { Button, Field, inputClass } from "@/components/ui";
import { useData } from "@/lib/store";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Settings | Dream Factory Events Admin" },
      { name: "description", content: "Business contact details and demo data controls." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Settings | Dream Factory Events Admin" },
      { property: "og:description", content: "Business settings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminSettings,
});

function AdminSettings() {
  const { settings, setSettings, resetDemoData } = useData();
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof draft) => (e: { target: { value: string } }) =>
    setDraft((d) => ({ ...d, [k]: e.target.value }));

  return (
    <AdminLayout title="Settings" description="Business details used across the website.">
      <Panel>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSettings(draft);
            setSaved(true);
            window.setTimeout(() => setSaved(false), 4000);
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Business Name" htmlFor="st-name">
              <input id="st-name" className={inputClass} value={draft.businessName} onChange={set("businessName")} />
            </Field>
            <Field label="Email" htmlFor="st-email">
              <input id="st-email" type="email" className={inputClass} value={draft.email} onChange={set("email")} />
            </Field>
            <Field label="Phone 1" htmlFor="st-p1">
              <input id="st-p1" className={inputClass} value={draft.phone1} onChange={set("phone1")} />
            </Field>
            <Field label="Phone 2" htmlFor="st-p2">
              <input id="st-p2" className={inputClass} value={draft.phone2} onChange={set("phone2")} />
            </Field>
            <Field label="WhatsApp Number (digits only)" htmlFor="st-wa">
              <input id="st-wa" className={inputClass} value={draft.whatsapp} onChange={set("whatsapp")} />
            </Field>
            <Field label="Instagram URL" htmlFor="st-ig">
              <input id="st-ig" className={inputClass} value={draft.instagram} onChange={set("instagram")} />
            </Field>
            <Field label="Facebook URL" htmlFor="st-fb">
              <input id="st-fb" className={inputClass} value={draft.facebook} onChange={set("facebook")} />
            </Field>
          </div>
          <Field label="Address" htmlFor="st-addr">
            <textarea id="st-addr" rows={3} className={inputClass} value={draft.address} onChange={set("address")} />
          </Field>
          <div className="flex items-center gap-4">
            <Button type="submit">Save Settings</Button>
            {saved ? <span className="text-sm text-success">Settings updated.</span> : null}
          </div>
        </form>
      </Panel>

      <Panel className="mt-8">
        <h2 className="text-lg font-semibold">Demo Data</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Restore all portfolio projects, services, testimonials, enquiries and content
          back to the original demo data.
        </p>
        <Button
          variant="outline"
          className="mt-5 text-destructive"
          onClick={() => {
            if (window.confirm("Reset all website content to the original demo data?")) {
              resetDemoData();
              setDraft(settings);
              window.location.reload();
            }
          }}
        >
          Reset Demo Data
        </Button>
      </Panel>
    </AdminLayout>
  );
}
