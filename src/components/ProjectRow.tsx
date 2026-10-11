import { ArrowUpRight } from "lucide-react";
import { projectUrl, type Project } from "@/data/projects";
import { ProofChain } from "./ProofChain";

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <article id={project.slug === "red-team-research" ? "thesis" : undefined} className="reveal border-t border-graphite py-8 md:py-10" style={{ ["--d" as string]: `${index * 40}ms` }}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-12">
        <div>
          <p className="meta flex gap-4 text-ash"><span className="shrink-0 text-white">P—{project.id}</span><span>{project.type}</span></p>
          <h3 className={`mt-4 font-semibold uppercase leading-tight tracking-[-0.035em] ${project.slug === "red-team-research" ? "text-[clamp(1.25rem,2vw,1.7rem)]" : "text-[clamp(1.5rem,2.8vw,2.4rem)]"}`}>
            <a href={projectUrl(project.slug)} className="hover:underline underline-offset-4" data-cursor="view">{project.title}</a>
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-fog">{project.summary}</p>
        </div>
        <div>
          <ProofChain steps={project.proof} note={project.proofNote} />
          <p className="meta mt-5 text-fog">{project.status}</p>
          {project.stackLabel ? <p className="meta mt-3 text-ash">{project.stackLabel}</p> : null}
          <ul className="mt-3 flex flex-wrap gap-2" aria-label={project.stackLabel ?? "Key technologies"}>
            {project.stack.map((s) => <li key={s} className="meta border border-graphite px-2.5 py-1.5 text-fog">{s}</li>)}
          </ul>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-2">
          <a href={projectUrl(project.slug)} className="meta inline-flex min-h-11 items-center gap-2 border-b border-white text-white" aria-label={`${project.slug === "red-team-research" ? "View research" : "View case study"}: ${project.title}`} data-cursor="view">
            {project.slug === "red-team-research" ? "View research" : "View case study"} <ArrowUpRight aria-hidden className="size-3.5" />
          </a>
          {project.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${l.label}: ${project.title}`} data-cursor="open" className="meta inline-flex min-h-11 items-center gap-2 border-b border-graphite text-fog hover:border-white">
              {l.label} <ArrowUpRight aria-hidden className="size-3.5" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
