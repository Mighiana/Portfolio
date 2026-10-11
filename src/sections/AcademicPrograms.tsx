import { SectionHeader } from "@/components/SectionHeader";
import { professionalDevelopment, programs, training, type AcademicRecord } from "@/data/academic";

function Record({ record, secondary = false }: { record: AcademicRecord; secondary?: boolean }) {
  const links = record.credentials.filter((c) => c.href);
  return (
    <article className="reveal border-t border-line-light py-6">
      <div className="grid gap-4 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <h3 className={`font-semibold uppercase leading-tight tracking-[-0.025em] ${secondary ? "text-xl" : "text-[clamp(1.3rem,2.2vw,1.85rem)]"}`}>{record.title}</h3>
          <p className="mt-3 text-base text-graphite">{record.institution}</p>
          {record.date || record.location ? <p className="meta mt-2 text-muted-light">{[record.date, record.location].filter(Boolean).join(" · ")}</p> : null}
        </div>
        <div className="md:col-span-7">
          <ul className="flex flex-wrap gap-2" aria-label="Program details">
            {record.metadata.map((m) => <li key={m} className="meta border border-line-light px-2.5 py-1.5 text-muted-light">{m}</li>)}
          </ul>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-graphite">{record.description}</p>
          {links.length > 1 ? (
            <details className="mt-3">
              <summary className="meta min-h-11 cursor-pointer py-3 underline underline-offset-4">View credentials</summary>
              <ul>{links.map((c) => <li key={c.title}><a href={c.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">{c.title} ↗</a></li>)}</ul>
            </details>
          ) : links.map((c) => <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" className="meta mt-3 inline-flex min-h-11 items-center underline underline-offset-4" aria-label={`View credential: ${c.title}`}>View credential ↗</a>)}
        </div>
      </div>
    </article>
  );
}

export function InternationalPrograms() {
  return (
    <section id="international" data-nav="experience" data-theme="light" aria-labelledby="international-title" className="bg-paper py-12 text-black md:py-16">
      <div className="shell">
        <SectionHeader index="06" label="International study" tone="light" />
        <h2 id="international-title" className="mt-6 max-w-3xl text-[clamp(1.75rem,3.5vw,3rem)] font-semibold uppercase leading-tight tracking-[-0.03em]">International &amp; Academic Programs</h2>
        <div className="mt-8 border-b border-line-light">{programs.map((p) => <Record key={p.title} record={p} />)}</div>
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="training" data-nav="experience" data-theme="light" aria-labelledby="training-title" className="bg-paper pb-20 text-black md:pb-24">
      <div className="shell">
        <SectionHeader index="08" label="Supporting credentials" tone="light" />
        <h2 id="training-title" className="mt-6 max-w-3xl text-[clamp(1.75rem,3.5vw,3rem)] font-semibold uppercase leading-tight tracking-[-0.03em]">Selected Certifications &amp; Training</h2>
        <div className="mt-8 border-b border-line-light">{training.map((t) => <Record key={t.title} record={t} />)}</div>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-light"><span className="meta mr-2 text-black">Professional development</span>{professionalDevelopment}</p>
      </div>
    </section>
  );
}
