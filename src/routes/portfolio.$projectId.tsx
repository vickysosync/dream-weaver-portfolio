import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowLeft, ArrowRight, MapPin } from "@/components/icons";
import { ButtonLink, Reveal } from "@/components/ui";
import { useData } from "@/lib/store";

export const Route = createFileRoute("/portfolio/$projectId")({
  head: () => ({
    meta: [
      { title: "Project | Dream Factory Events Portfolio" },
      {
        name: "description",
        content:
          "Explore a Dream Factory Events project in detail — concept, services delivered and event gallery.",
      },
      { property: "og:title", content: "Project | Dream Factory Events Portfolio" },
      {
        property: "og:description",
        content: "Explore a Dream Factory Events project in detail.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const { projectId } = Route.useParams();
  const { projects } = useData();
  const index = projects.findIndex((p) => String(p.id) === projectId);
  const project = projects[index];

  if (!project) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-5 py-40 text-center">
          <h1 className="text-3xl">Project not found</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This project may have been removed from the portfolio.
          </p>
          <ButtonLink to="/portfolio" className="mt-8">
            Back to Portfolio
          </ButtonLink>
        </div>
      </SiteLayout>
    );
  }

  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;

  return (
    <SiteLayout>
      <article>
        <div className="relative h-[70vh] min-h-[26rem] overflow-hidden">
          <img
            src={project.coverImage}
            alt={`${project.title} cover`}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,var(--background)_6%,color-mix(in_oklab,var(--background)_55%,transparent))]"
          />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-gold"
              >
                <ArrowLeft className="h-4 w-4" /> All Projects
              </Link>
              <p className="eyebrow mt-6">{project.category}</p>
              <h1 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {project.location}
                </span>
                <span>
                  {new Date(project.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.5fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <h2 className="text-2xl">About This Project</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {project.galleryImages.map((img, i) => (
                <Reveal key={`${img}-${i}`} delay={i * 80}>
                  <img
                    src={img}
                    alt={`${project.title} gallery image ${i + 1}`}
                    loading="lazy"
                    className="h-72 w-full rounded-2xl border border-border object-cover"
                  />
                </Reveal>
              ))}
            </div>
          </div>

          <aside className="h-fit lg:sticky lg:top-28">
            <div className="glass-card rounded-3xl p-7">
              <h2 className="text-lg font-semibold">Services Delivered</h2>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {project.services.map((s) => (
                  <li key={s} className="border-b border-border pb-3 last:border-0">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-sm text-muted-foreground">
                Planning something similar?
              </p>
              <ButtonLink to="/contact" className="mt-4 w-full">
                Enquire About This Setup
              </ButtonLink>
            </div>
          </aside>
        </div>

        <nav
          aria-label="Project navigation"
          className="border-t border-border bg-surface/30"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <Link
              to="/portfolio/$projectId"
              params={{ projectId: String(prev.id) }}
              className="group flex items-center gap-3 text-left"
            >
              <ArrowLeft className="h-5 w-5 text-gold transition-transform group-hover:-translate-x-1" />
              <span>
                <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                  Previous
                </span>
                <span className="text-sm font-semibold">{prev.title}</span>
              </span>
            </Link>
            <Link
              to="/portfolio/$projectId"
              params={{ projectId: String(next.id) }}
              className="group flex items-center gap-3 sm:text-right"
            >
              <span>
                <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                  Next
                </span>
                <span className="text-sm font-semibold">{next.title}</span>
              </span>
              <ArrowRight className="h-5 w-5 text-gold transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </nav>
      </article>
    </SiteLayout>
  );
}
