import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/data";
import { ArrowRight, MapPin } from "./icons";
import { cn, Reveal } from "./ui";

export function ProjectCard({
  project,
  tall = false,
}: {
  project: Project;
  tall?: boolean;
}) {
  return (
    <Link
      to="/portfolio/$projectId"
      params={{ projectId: String(project.id) }}
      className={cn(
        "group relative block overflow-hidden rounded-3xl border border-border",
        tall ? "h-[30rem]" : "h-80",
      )}
    >
      <img
        src={project.coverImage}
        alt={`${project.title} — ${project.category} event decor in ${project.location}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,var(--background)_5%,transparent_70%)] transition-opacity duration-500 group-hover:opacity-95"
      />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="inline-block rounded-full border border-gold/40 bg-background/50 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold backdrop-blur">
          {project.category}
        </span>
        <h3 className="mt-3 text-xl leading-snug">{project.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {project.location}
        </p>
        <span className="mt-4 inline-flex translate-y-2 items-center gap-2 text-sm font-semibold text-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View Project <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export function PortfolioGrid({
  projects,
  categories,
  limit,
}: {
  projects: Project[];
  categories: string[];
  limit?: number;
}) {
  const [active, setActive] = useState("All");
  const tabs = ["All", ...categories];

  const filtered = useMemo(() => {
    const list =
      active === "All" ? projects : projects.filter((p) => p.category === active);
    return limit ? list.slice(0, limit) : list;
  }, [active, projects, limit]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            aria-pressed={active === t}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300",
              active === t
                ? "border-transparent bg-brand text-primary-foreground"
                : "border-border text-muted-foreground hover:border-gold hover:text-gold",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-center text-sm text-muted-foreground">
          No projects in this category yet.
        </p>
      ) : (
        <div className="mt-12 grid auto-rows-auto gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal
              key={p.id}
              delay={(i % 6) * 70}
              className={cn(i % 5 === 0 ? "lg:row-span-2" : "")}
            >
              <ProjectCard project={p} tall={i % 5 === 0} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
