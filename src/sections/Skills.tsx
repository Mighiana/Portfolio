import { Boxes, Cloud, Network, Server, Workflow } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { skillGroups, type SkillGroup } from "@/data/skills";

const icons: Record<SkillGroup["icon"], typeof Cloud> = { automation: Workflow, cloud: Cloud, network: Network, systems: Server, tools: Boxes };

export function Skills() {
  const total = skillGroups.reduce((n, g) => n + g.items.length, 0);
  return (
    <section id="skills" data-nav="skills" data-theme="dark" aria-labelledby="skills-title" className="bg-ink py-24 text-white md:py-36">
      <div className="shell">
        <SectionHeader index="05" label="System inventory" aside={`${total} components / ${skillGroups.length} modules`} />
        <div className="mt-14 flex flex-col gap-6 md:mt-20 md:flex-row md:items-end md:justify-between">
          <h2 id="skills-title" className="display reveal-lines text-[clamp(3rem,9vw,8.5rem)]">
            <span className="line"><span>System</span></span>
            <span className="line" style={{ ["--i" as string]: 1 }}><span>inventory</span></span>
          </h2>
          <p className="reveal meta flex items-center gap-3 text-ash">
            <span className="border border-graphite px-1.5 py-0.5 text-fog">Basic</span> = foundational working knowledge
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 border-l border-t border-graphite sm:grid-cols-2 md:mt-24 lg:grid-cols-5">
          {skillGroups.map((g, gi) => {
            const Icon = icons[g.icon];
            return (
              <div key={g.code} className="reveal flex flex-col border-b border-r border-graphite" style={{ ["--d" as string]: `${gi * 70}ms` }}>
                <div className="border-b border-graphite p-5">
                  <div className="flex items-center justify-between text-ash">
                    <Icon aria-hidden strokeWidth={1.25} className="size-5 text-white" />
                    <span className="meta tabular-nums">{g.code}.{String(gi + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold uppercase tracking-[-0.03em]">{g.title}</h3>
                  <p className="meta mt-1 text-ash">{g.subtitle} — {String(g.items.length).padStart(2, "0")}</p>
                </div>
                <ul className="flex-1">
                  {g.items.map((s, i) => (
                    <li key={s.name} className="flex min-h-11 items-center justify-between gap-3 border-b border-graphite/60 px-5 py-2.5 last:border-b-0">
                      <span className="flex items-baseline gap-3">
                        <span className="meta w-5 text-ash/70 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[15px] text-fog">{s.name}</span>
                      </span>
                      {s.level ? <span className="meta border border-graphite px-1.5 py-0.5 text-[10px] text-ash">Basic</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
