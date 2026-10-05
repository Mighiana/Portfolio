import { ProjectRow } from "@/components/ProjectRow";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/data/projects";

export function Projects() {
  const list = projects.filter((p) => p.published);
  return (
    <section id="projects" data-nav="projects" data-theme="dark" aria-labelledby="projects-title" className="bg-ink py-24 text-white md:py-36">
      <div className="shell">
        <SectionHeader index="03" label="Selected work" aside={`${String(list.length).padStart(2, "0")} entries`} />
        <div className="mt-14 flex flex-col gap-6 md:mt-20 md:flex-row md:items-end md:justify-between">
          <h2 id="projects-title" className="display reveal-lines text-[clamp(3rem,9vw,8.5rem)]">
            <span className="line"><span>Selected</span></span>
            <span className="line" style={{ ["--i" as string]: 1 }}><span>work</span></span>
          </h2>
          <p className="reveal max-w-xs text-base leading-relaxed text-ash">
            Security research, cloud tooling and infrastructure work. The thesis is documented in full below.
          </p>
        </div>
        <div className="mt-16 border-b border-graphite md:mt-24">
          {list.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
