import { SectionHeader } from "@/components/SectionHeader";
import { projectUrl } from "@/data/projects";

export function Currently() {
  const focus = [
    { title: "Researching", text: "Red-team automation thesis — experimental design stage.", href: projectUrl("red-team-research"), cta: "View research" },
    { title: "Building", text: "Cloud, network and Windows identity security projects.", href: "#projects", cta: "View projects" },
    { title: "Seeking", text: "Security, cloud and infrastructure traineeships / graduate roles.", href: "#contact", cta: "Contact" },
  ];
  return (
    <section id="currently" data-nav="about" data-theme="light" aria-labelledby="currently-title" className="bg-paper pb-16 text-black md:pb-20">
      <div className="shell">
        <SectionHeader index="03" label="Current focus" tone="light" />
        <h2 id="currently-title" className="mt-6 text-3xl font-semibold uppercase tracking-[-0.03em]">Currently</h2>
        <div className="mt-6 grid grid-cols-1 border-l border-t border-line-light sm:grid-cols-3">
          {focus.map((f, i) => (
            <article key={f.title} className="reveal flex flex-col border-b border-r border-line-light p-5">
              <p className="meta text-muted-light">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="meta mt-3 text-black">{f.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-graphite">{f.text}</p>
              <a href={f.href} className="meta mt-auto inline-flex min-h-11 items-center self-start pt-4 underline underline-offset-4">{f.cta} ↗</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
