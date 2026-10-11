import { SectionHeader } from "@/components/SectionHeader";
import { profile } from "@/data/profile";
import { projectUrl } from "@/data/projects";

export function Currently() {
  const focus = [
    { title: "BSc thesis research", text: "Automation of Red Team Security in Controlled Environments", meta: "Research / Experimental design", href: projectUrl("red-team-research"), cta: "View research" },
    { title: "Security engineering", text: "Cloud security, network security, PKI, privacy engineering and security automation.", href: "#projects", cta: "View projects" },
    { title: "Education", text: `${profile.degree} · ${profile.university}`, meta: `${profile.status} · Expected graduation ${profile.graduation}`, href: "#education", cta: "Academic record" },
    { title: "Opportunities", text: "Cybersecurity, cloud security, infrastructure security and security research.", meta: "Traineeships / graduate / early-career", href: "#contact", cta: "Contact" },
  ];
  return (
    <section id="currently" data-nav="about" data-theme="light" aria-labelledby="currently-title" className="bg-paper pb-16 text-black md:pb-20">
      <div className="shell">
        <SectionHeader index="03" label="Current focus" tone="light" />
        <h2 id="currently-title" className="mt-6 text-3xl font-semibold uppercase tracking-[-0.03em]">Currently</h2>
        <div className="mt-6 grid grid-cols-1 border-l border-t border-line-light sm:grid-cols-2 lg:grid-cols-4">
          {focus.map((f, i) => (
            <article key={f.title} className="reveal flex flex-col border-b border-r border-line-light p-5">
              <p className="meta text-muted-light">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="meta mt-3 text-black">{f.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-graphite">{f.text}</p>
              {f.meta ? <p className="meta mt-4 text-muted-light">{f.meta}</p> : null}
              <a href={f.href} className="meta mt-auto inline-flex min-h-11 items-center self-start pt-4 underline underline-offset-4">{f.cta} ↗</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
