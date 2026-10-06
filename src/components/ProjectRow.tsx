import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectSpec } from "@/data/projects";
import { cn } from "@/lib/cn";
import { DemoClip } from "./DemoClip";
import { ProjectVisual } from "./visuals/ProjectVisual";

const specRows: [keyof ProjectSpec, string][] = [
  ["problem", "Problem"],
  ["built", "What I built"],
  ["architecture", "Architecture"],
  ["implementation", "Implementation"],
  ["decisions", "Technical decisions"],
  ["result", "Status / result"],
];

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const primary = project.caseStudy ?? project.links[0]?.href;
  const primaryExternal = !!primary && /^https?:/.test(primary);
  const interactive = !!primary;

  return (
    <article
      className={cn("reveal group relative border-t border-graphite", interactive && "hover:bg-white/[0.015]")}
      style={{ ["--d" as string]: `${index * 80}ms` }}
      data-cursor={interactive ? "view" : undefined}
    >
      <div className="grid grid-cols-1 gap-8 py-10 md:py-14 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col lg:col-span-6">
          <div className="meta flex flex-wrap items-center gap-x-5 gap-y-2 text-ash transition-colors duration-500 group-hover:text-fog">
            <span className="text-white tabular-nums transition-transform duration-500 group-hover:translate-x-1">P—{project.id}</span>
            <span>{project.type}</span>
            <span className="tabular-nums">{project.year}</span>
            <span className="flex items-center gap-2">
              <span aria-hidden className={cn("size-1.5", project.draft ? "border border-ash" : "bg-white")} />
              {project.status}
            </span>
          </div>

          <h3 className="mt-6 text-[clamp(1.6rem,3.4vw,2.75rem)] font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-white">
            {primary ? (
              <a
                href={primary}
                {...(primaryExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                data-cursor="view"
                className="after:absolute after:inset-0 after:content-['']"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-fog md:text-[17px]">
            {project.summary}
          </p>

          {project.stackLabel && project.stack.length ? <p className="meta mt-6 text-ash">{project.stackLabel}</p> : null}
          {project.stack.length ? (
            <ul className={cn("relative z-10 flex flex-wrap gap-2", project.stackLabel ? "mt-3" : "mt-6")} aria-label={project.stackLabel ? `Tech stack (${project.stackLabel})` : "Tech stack"}>
              {project.stack.map((s) => (
                <li key={s} className="meta border border-graphite px-2.5 py-1.5 text-fog">{s}</li>
              ))}
            </ul>
          ) : null}

          <div className="relative z-10 mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8">
            {project.caseStudy ? (
              <a href={project.caseStudy} data-cursor="view" className="meta inline-flex min-h-11 items-center gap-2 border-b border-white text-white">
                Read case study <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            ) : null}
            {project.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" data-cursor="open" className="meta inline-flex min-h-11 items-center gap-2 border-b border-graphite text-fog hover:border-white hover:text-white">
                {l.label} <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            ))}
            {project.draft ? <span className="meta inline-flex min-h-11 items-center text-ash">Details to be added</span> : null}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[43/24] w-full overflow-hidden border border-graphite bg-ink transition-colors duration-700 group-hover:border-ash">
            <div aria-hidden className="absolute inset-0 opacity-40 [background-image:linear-gradient(#242424_1px,transparent_1px),linear-gradient(90deg,#242424_1px,transparent_1px)] [background-size:32px_32px]" />
            <ProjectVisual
              labels={project.visualLabels}
              boundary={project.visualBoundary}
              sequence={project.visualSequence}
              kind={project.visual}
              className="relative h-full w-full p-4 opacity-80 transition-opacity duration-700 group-hover:opacity-100"
            />
            <span className="meta absolute bottom-3 left-3 text-ash">FIG. {project.visualFigure ?? `P—${project.id}`} / {project.visualCaption ?? "Architecture"}</span>
          </div>
        </div>

        {project.spec ? (
          <dl className="relative z-10 grid grid-cols-1 border-l border-t border-graphite sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3">
            {specRows.map(([key, label]) => (
              <div key={key} className="border-b border-r border-graphite p-4 md:p-5">
                <dt className="meta text-white">{project.specLabels?.[key] ?? label}</dt>
                <dd className="mt-2.5 text-[15px] leading-relaxed text-fog">{project.spec![key]}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {project.demos?.length ? (
          <div className="lg:col-span-12">
            <p className="meta mb-3 text-ash">Evidence / recorded from the real project</p>
            <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2", project.demos.length >= 3 && "lg:grid-cols-3")}>
              {project.demos.map((d) => (
                <DemoClip key={d.webm} demo={d} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
