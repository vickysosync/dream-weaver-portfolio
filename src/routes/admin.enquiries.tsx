import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Modal, StatusBadge, TableWrap, tdClass, thClass } from "@/components/admin/kit";
import { Eye, Trash } from "@/components/icons";
import { Button } from "@/components/ui";
import type { Enquiry } from "@/lib/data";
import { useData } from "@/lib/store";

export const Route = createFileRoute("/admin/enquiries")({
  head: () => ({
    meta: [
      { title: "Enquiries | Dream Factory Events Admin" },
      { name: "description", content: "Review and manage incoming event enquiries." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Enquiries | Dream Factory Events Admin" },
      { property: "og:description", content: "Manage event enquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminEnquiries,
});

function AdminEnquiries() {
  const { enquiries, setEnquiryStatus, deleteEnquiry } = useData();
  const [selected, setSelected] = useState<Enquiry | null>(null);

  return (
    <AdminLayout
      title="Enquiries"
      description="Enquiries submitted through the website contact form (stored locally)."
    >
      <TableWrap>
        <thead>
          <tr>
            <th className={thClass}>Name</th>
            <th className={thClass}>Event Type</th>
            <th className={thClass}>Event Date</th>
            <th className={thClass}>Phone</th>
            <th className={thClass}>Received</th>
            <th className={thClass}>Status</th>
            <th className={thClass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((e) => (
            <tr key={e.id}>
              <td className={tdClass}>{e.name}</td>
              <td className={tdClass}>{e.eventType}</td>
              <td className={tdClass}>{e.eventDate}</td>
              <td className={tdClass}>{e.phone}</td>
              <td className={tdClass}>{e.createdAt}</td>
              <td className={tdClass}>
                <StatusBadge status={e.status} />
              </td>
              <td className={tdClass}>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelected(e)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEnquiryStatus(e.id, "Contacted")}
                  >
                    Contacted
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEnquiryStatus(e.id, "Completed")}
                  >
                    Completed
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    aria-label={`Delete enquiry from ${e.name}`}
                    onClick={() => {
                      if (window.confirm(`Delete enquiry from ${e.name}?`))
                        deleteEnquiry(e.id);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {enquiries.length === 0 ? (
            <tr>
              <td className={tdClass} colSpan={7}>
                No enquiries yet.
              </td>
            </tr>
          ) : null}
        </tbody>
      </TableWrap>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Enquiry Details"
      >
        {selected ? (
          <dl className="space-y-4 text-sm">
            {[
              ["Client Name", selected.name],
              ["Phone", selected.phone],
              ["Email", selected.email],
              ["Event Type", selected.eventType],
              ["Event Date", selected.eventDate],
              ["Venue", selected.venue],
              ["Budget", selected.budget || "—"],
              ["Message", selected.message || "—"],
              ["Received", selected.createdAt],
              ["Status", selected.status],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-border pb-3">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  {k}
                </dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Modal>
    </AdminLayout>
  );
}
