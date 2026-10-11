import { profile } from "@/data/profile";
import { projectUrl } from "@/data/projects";

export function Education() {
  const record = [
    { k: "Programme", v: profile.degree },
    { k: "Specialization", v: profile.specialization },
    { k: "Status", v: profile.status },
    { k: "Expected graduation", v: profile.graduation },
    { k: "Scholarship", v: profile.scholarship },
    { k: "Thesis", v: "Automation of Red Team Security in Controlled Environments", href: projectUrl("red-team-research") },
  ];
  return (
    <section id="education" data-nav="experience" data-theme="light" aria-labelledby="education-title" className="bg-paper py-12 text-black md:py-16">
      <div className="shell">
        <div className="reveal relative overflow-hidden bg-ink text-white">
          <span aria-hidden className="pointer-events-none absolute -bottom-[0.2em] -right-[0.04em] select-none text-[clamp(8rem,26vw,22rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.04]">
            {profile.graduation.split(" ").pop()}
          </span>
          <div className="relative grid grid-cols-1 gap-12 p-6 md:p-12 lg:grid-cols-12 lg:p-16">
            <div className="lg:col-span-6">
              <p className="meta text-ash"><span className="text-white">07 / Academic record</span></p>
              <h2 id="education-title" className="display mt-10 text-[clamp(2.5rem,6.5vw,5.75rem)] leading-[0.9]">
                Óbuda<br />University
              </h2>
              <p className="mt-6 text-lg text-fog">{profile.faculty}</p>
            </div>
            <dl className="self-end border-t border-graphite lg:col-span-5 lg:col-start-8">
              {record.map((r) => (
                <div key={r.k} className="grid grid-cols-5 gap-4 border-b border-graphite py-3.5">
                  <dt className="meta col-span-2 text-ash">{r.k}</dt>
                  <dd className="col-span-3 text-[15px] leading-snug">
                    {r.href ? <a href={r.href} className="underline decoration-graphite underline-offset-4 hover:decoration-white">{r.v}</a> : r.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
