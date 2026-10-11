import { ArrowUpRight } from "lucide-react";
import { ProjectRow } from "@/components/ProjectRow";
import { SectionHeader } from "@/components/SectionHeader";
import { projects, projectUrl } from "@/data/projects";

export function Projects() {
  const list = projects.filter((p) => p.published);
  const featured = list.filter((p) => p.tier === "featured");
  const other = list.filter((p) => p.tier === "other");
  return (
    <section id="projects" data-nav="projects" data-theme="dark" aria-labelledby="projects-title" className="bg-ink pb-16 pt-24 text-white md:pb-20 md:pt-32">
      <div className="shell">
        <SectionHeader index="04" label="Selected work" aside={`${String(featured.length).padStart(2, "0")} featured / ${String(other.length).padStart(2, "0")} other`} />
        <div className="mt-12 flex flex-col gap-6 md:mt-16 md:flex-row md:items-end md:justify-between">
          <h2 id="projects-title" className="display reveal-lines text-[clamp(2.5rem,7vw,6.5rem)]">
            <span className="line"><span>Selected</span></span>
            <span className="line" style={{ ["--i" as string]: 1 }}><span>work</span></span>
          </h2>
          <p className="reveal max-w-xs text-base leading-relaxed text-ash">
            Engineering projects, technical evidence and clearly labelled research. Open a case study to inspect the details.
          </p>
        </div>
        <div className="mt-12 border-b border-graphite md:mt-16">
          {featured.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
        {other.length ? (
          <div className="mt-14 md:mt-16">
            <h3 className="meta text-white">Other engineering work</h3>
            <ul className="mt-5 grid grid-cols-1 border-l border-t border-graphite md:grid-cols-2">
              {other.map((p) => (
                <li key={p.id} className="reveal flex flex-col border-b border-r border-graphite p-5 md:p-6">
                  <p className="meta flex gap-4 text-ash"><span className="shrink-0 text-white">P—{p.id}</span><span>{p.type}</span></p>
                  <h4 className="mt-3 text-xl font-semibold uppercase tracking-[-0.03em]">
                    <a href={projectUrl(p.slug)} className="hover:underline underline-offset-4" data-cursor="view">{p.title}</a>
                  </h4>
                  <p className="mt-3 text-[15px] leading-relaxed text-fog">{p.summary}</p>
                  <p className="meta mt-4 text-fog">{p.status}</p>
                  <div className="mt-auto flex flex-wrap gap-x-6 gap-y-1 pt-3">
                    <a href={projectUrl(p.slug)} aria-label={`View case study: ${p.title}`} data-cursor="view"
                      className="meta inline-flex min-h-11 items-center gap-2 border-b border-white text-white">
                      View case study<ArrowUpRight aria-hidden className="size-3.5" />
                    </a>
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${l.label}: ${p.title}`} data-cursor="open"
                        className="meta inline-flex min-h-11 items-center gap-2 border-b border-graphite text-fog hover:border-white">
                        {l.label}<ArrowUpRight aria-hidden className="size-3.5" />
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
