import { profile } from "@/data/profile";

export function Education() {
  const record = [
    { k: "Institution", v: profile.university },
    { k: "Faculty", v: profile.faculty },
    { k: "Programme", v: profile.degree },
    { k: "Status", v: profile.status },
    { k: "Expected graduation", v: profile.graduation },
    { k: "Thesis", v: "Automation of Red Team Security in Controlled Environments", href: "#thesis" },
  ];
  return (
    <section id="education" data-nav="experience" data-theme="light" aria-labelledby="education-title" className="bg-paper pb-24 text-black md:pb-36">
      <div className="shell">
        <div className="reveal relative overflow-hidden bg-ink text-white">
          <span aria-hidden className="pointer-events-none absolute -bottom-[0.2em] -right-[0.04em] select-none text-[clamp(8rem,26vw,22rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.04]">
            {profile.graduation}
          </span>
          <div className="relative grid grid-cols-1 gap-12 p-6 md:p-12 lg:grid-cols-12 lg:p-16">
            <div className="lg:col-span-6">
              <p className="meta text-ash"><span className="text-white">Academic record</span> / 01</p>
              <h2 id="education-title" className="display mt-10 text-[clamp(2.5rem,6.5vw,5.75rem)] leading-[0.9]">
                Óbuda<br />University
              </h2>
              <p className="mt-6 text-lg text-fog">{profile.faculty}</p>
              <p className="meta mt-8 inline-flex border border-graphite px-3 py-2 text-white">Expected graduation — {profile.graduation}</p>
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
