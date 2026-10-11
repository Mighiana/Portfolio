import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { RevealObserver } from "@/components/RevealObserver";
import { ProofChain } from "@/components/ProofChain";
import { DemoClip } from "@/components/DemoClip";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { ThesisCaseStudy } from "@/sections/ThesisCaseStudy";
import { projects, type ProjectSpec } from "@/data/projects";
import { profile } from "@/data/profile";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug && p.published);
  if (!p) notFound();
  const title = `${p.title} — Muhammad Usman`;
  const url = `${profile.siteUrl}/projects/${p.slug}/`;
  return {
    title: { absolute: title }, description: p.summary,
    alternates: { canonical: url },
    openGraph: { title, description: p.summary, url },
    twitter: { title, description: p.summary },
  };
}

const specRows: [keyof ProjectSpec, string][] = [
  ["problem", "Problem"], ["built", "What I built"], ["architecture", "Architecture"],
  ["implementation", "Implementation"], ["decisions", "Technical decisions"], ["result", "Status / limitations"],
];

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug && p.published);
  if (!p) notFound();
  const home = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`;
  return (
    <>
      <a href="#main" className="skip-link meta">Skip to content</a>
      <Navbar />
      <main id="main">
        <div className="shell bg-ink pb-4 pt-24 text-white">
          <a href={`${home}#projects`} className="meta inline-flex min-h-11 items-center text-fog hover:text-white">← Back to selected work</a>
        </div>
        {p.slug === "red-team-research" ? <ThesisCaseStudy /> : (
          <section data-nav="projects" data-theme="dark" aria-labelledby="case-title" className="bg-ink pb-20 text-white md:pb-28">
            <div className="shell">
              <p className="meta mt-6 text-ash">P—{p.id} / {p.type} / {p.year}</p>
              <h1 id="case-title" className="mt-5 max-w-5xl text-[clamp(2rem,5.5vw,5rem)] font-semibold uppercase leading-tight tracking-[-0.04em]">{p.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-fog">{p.summary}</p>
              <p className="meta mt-6 text-white">{p.status}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                {p.stack.map((s) => <li key={s} className="meta border border-graphite px-3 py-2 text-fog">{s}</li>)}
              </ul>
              <div className="mt-8"><ProofChain steps={p.proof} note={p.proofNote} /></div>
              <dl className="mt-10 grid grid-cols-1 border-l border-t border-graphite md:grid-cols-2">
                {specRows.map(([key, label]) => (
                  <div key={key} className="border-b border-r border-graphite p-5 md:p-7">
                    <dt className="meta text-white">{label}</dt>
                    <dd className="mt-3 text-base leading-relaxed text-fog">{p.spec[key]}</dd>
                  </div>
                ))}
              </dl>
              {p.visual === "graph" || p.visual === "cloud" ? (
                <figure className="mt-10 max-w-3xl">
                  <div className="aspect-[43/24] border border-graphite">
                    <ProjectVisual kind={p.visual} className="h-full w-full p-4" />
                  </div>
                  <figcaption className="mt-3 text-sm leading-relaxed text-ash">
                    {p.visual === "graph" ? "Illustrative modeled reachability, not a recorded analysis graph." : "2026 reconstruction: public bastion / private workload / outbound NAT. Terraform validation is not live AWS evidence."}
                  </figcaption>
                </figure>
              ) : null}
              {p.demos?.length ? (
                <div className="mt-10">
                  <h2 className="meta mb-4 text-fog">Recorded engineering evidence</h2>
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {p.demos.map((d) => <DemoClip key={d.webm} demo={d} />)}
                  </div>
                </div>
              ) : null}
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-graphite pt-5">
                {[...p.links, ...(p.evidence ?? [])].map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="meta inline-flex min-h-11 items-center border-b border-graphite text-fog hover:border-white" data-cursor="open">{l.label} ↗</a>
                ))}
              </div>
            </div>
          </section>
        )}
        <div className="shell flex flex-wrap gap-8 border-t border-graphite py-8">
          <a href={`${home}#projects`} className="meta inline-flex min-h-11 items-center text-fog">← All projects</a>
          <a href={`${home}#contact`} className="meta inline-flex min-h-11 items-center text-fog">Contact ↗</a>
        </div>
      </main>
      <RevealObserver />
      <CustomCursor />
    </>
  );
}
