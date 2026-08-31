import { Link, createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard, StatusBadge, TableWrap, tdClass, thClass } from "@/components/admin/kit";
import { useData } from "@/lib/store";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | Dream Factory Events Admin" },
      { name: "description", content: "Overview of projects, services and enquiries." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Dashboard | Dream Factory Events Admin" },
      { property: "og:description", content: "Admin dashboard overview." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { projects, services, testimonials, enquiries, setEnquiryStatus } = useData();

  return (
    <AdminLayout
      title="Dashboard"
      description="A snapshot of your website content and incoming enquiries."
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Projects" value={projects.length} />
        <StatCard
          label="Featured Projects"
          value={projects.filter((p) => p.featured).length}
        />
        <StatCard label="Services" value={services.length} />
        <StatCard label="Enquiries" value={enquiries.length} />
        <StatCard label="Testimonials" value={testimonials.length} />
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl">Recent Enquiries</h2>
          <Link to="/admin/enquiries" className="text-sm text-gold hover:underline">
            View all
          </Link>
        </div>
        <TableWrap>
          <thead>
            <tr>
              <th className={thClass}>Name</th>
              <th className={thClass}>Event Type</th>
              <th className={thClass}>Date</th>
              <th className={thClass}>Phone</th>
              <th className={thClass}>Status</th>
              <th className={thClass}>Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.slice(0, 6).map((e) => (
              <tr key={e.id}>
                <td className={tdClass}>{e.name}</td>
                <td className={tdClass}>{e.eventType}</td>
                <td className={tdClass}>{e.eventDate}</td>
                <td className={tdClass}>{e.phone}</td>
                <td className={tdClass}>
                  <StatusBadge status={e.status} />
                </td>
                <td className={tdClass}>
                  <select
                    aria-label={`Change status for ${e.name}`}
                    value={e.status}
                    onChange={(ev) =>
                      setEnquiryStatus(
                        e.id,
                        ev.target.value as "New" | "Contacted" | "Completed",
                      )
                    }
                    className="rounded-lg border border-input bg-surface px-3 py-1.5 text-xs"
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Completed</option>
                  </select>
                </td>
              </tr>
            ))}
            {enquiries.length === 0 ? (
              <tr>
                <td className={tdClass} colSpan={6}>
                  No enquiries yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </TableWrap>
      </div>
    </AdminLayout>
  );
}
