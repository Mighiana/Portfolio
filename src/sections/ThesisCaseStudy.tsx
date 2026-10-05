"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { ArchitectureDiagramHorizontal, ArchitectureDiagramVertical } from "@/components/ArchitectureDiagram";
import { SectionHeader } from "@/components/SectionHeader";
import { chapters, thesis, type Chapter } from "@/data/thesis";
import { cn } from "@/lib/cn";

function Panel({ c }: { c: Chapter }) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="meta text-ash">
          <span className="text-white">{c.index}</span> / {c.title}
        </p>
        <h3 className="mt-5 text-[clamp(1.75rem,3.6vw,3rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em]">{c.heading}</h3>
      </div>
      <div className="flex flex-col gap-6 lg:col-span-7">
        {c.body.map((b, i) => (
          <p key={i} className="max-w-2xl text-lg leading-relaxed text-fog">{b}</p>
        ))}
        {c.placeholder ? (
          <div className="flex min-h-40 flex-col justify-between border border-dashed border-ash p-5">
            <span className="meta text-ash">Status / pending</span>
            <span className="text-[clamp(1.4rem,3vw,2.25rem)] font-semibold uppercase tracking-[-0.02em]">{c.placeholder}</span>
          </div>
        ) : null}
        {c.points ? (
          <dl className="grid grid-cols-1 border-l border-t border-graphite sm:grid-cols-2">
            {c.points.map((p, i) => (
              <div key={p.label} className="border-b border-r border-graphite p-5">
                <dt className="meta flex justify-between text-white">
                  <span>{p.label}</span>
                  <span className="text-ash tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-ash">{p.text}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {c.code ? (
          <figure className="border border-graphite">
            <figcaption className="meta flex justify-between border-b border-graphite px-4 py-3 text-ash">
              <span>{c.code.caption}</span>
              <span>run.py</span>
            </figcaption>
            <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-fog md:p-5">
              <code>{c.code.source}</code>
            </pre>
          </figure>
        ) : null}
      </div>
    </div>
  );
}

export function ThesisCaseStudy() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const chapter = chapters[active];

  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = active;
    if (e.key in map) next = (active + map[e.key] + chapters.length) % chapters.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = chapters.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="thesis" data-nav="projects" data-theme="dark" aria-labelledby="thesis-title" className="relative bg-void text-white">
      {/* Full-screen chapter opener */}
      <div className="shell flex flex-col pb-10 pt-20 md:pt-24">
        <SectionHeader index="03.1" label="Flagship case study" aside="Thesis / 2026" />
        <div className="flex flex-col py-10 md:py-12">
          <p className="reveal meta flex items-center gap-3 text-fog">
            <span aria-hidden className="size-1.5 bg-white" /> {thesis.label}
          </p>
          <h2 id="thesis-title" className="display reveal-lines mt-8 text-[clamp(2.1rem,5.4vw,5.25rem)] leading-[0.92]">
            {thesis.titleLines.map((l, i) => (
              <span key={l} className={cn("line", i === 1 ? "text-white" : "text-fog")} style={{ ["--i" as string]: i }}>
                <span>{l}</span>
              </span>
            ))}
          </h2>
        </div>
        <dl className="reveal grid grid-cols-2 border-l border-t border-graphite md:grid-cols-4">
          {thesis.meta.map((m) => (
            <div key={m.label} className="border-b border-r border-graphite p-4 md:p-5">
              <dt className="meta text-ash">{m.label}</dt>
              <dd className="mt-3 text-[15px] font-medium leading-snug md:text-base">{m.value}</dd>
            </div>
          ))}
        </dl>
        <p className="reveal meta mt-5 text-ash">Scope — {thesis.scope}</p>
      </div>

      {/* Architecture figure */}
      <div className="border-t border-graphite">
        <div className="shell py-16 md:py-20">
          <div className="reveal meta mb-10 flex items-center justify-between text-ash">
            <span><span className="text-white">FIG. 04</span> / System architecture — conceptual</span>
            <span className="hidden sm:inline">Highlight: {chapter.title}</span>
          </div>
          <ArchitectureDiagramHorizontal focus={chapter.focus} className="reveal hidden md:block" />
          <ArchitectureDiagramVertical focus={chapter.focus} className="reveal md:hidden" />
        </div>
      </div>

      {/* Dossier chapters */}
      <div className="border-t border-graphite">
        <div className="shell py-16 md:py-20">
          <div role="tablist" aria-label="Case study chapters" onKeyDown={onKey} className="no-scrollbar -mx-5 flex overflow-x-auto border-y border-graphite px-5 md:mx-0 md:grid md:grid-cols-6 md:px-0">
            {chapters.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => { tabs.current[i] = el; }}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${c.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "meta relative flex min-h-14 shrink-0 items-center gap-2 px-4 text-left transition-colors md:px-3",
                  i === active ? "text-white" : "text-ash hover:text-fog",
                )}
              >
                <span className="tabular-nums">{c.index}</span>
                <span>{c.title}</span>
                <span aria-hidden className={cn("absolute inset-x-0 -bottom-px h-px bg-white transition-transform duration-500", i === active ? "scale-x-100" : "scale-x-0")} />
              </button>
            ))}
          </div>

          <div className="relative mt-10 min-h-[20rem] md:min-h-[22rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter.id}
                role="tabpanel"
                id={`panel-${chapter.id}`}
                aria-labelledby={`tab-${chapter.id}`}
                tabIndex={0}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="outline-none"
              >
                <Panel c={chapter} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="meta mt-10 flex items-center justify-between border-t border-graphite pt-4 text-ash">
            <button type="button" onClick={() => setActive((active - 1 + chapters.length) % chapters.length)} className="min-h-11 hover:text-white">← Prev</button>
            <span className="tabular-nums">{chapter.index} / {String(chapters.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => setActive((active + 1) % chapters.length)} className="min-h-11 hover:text-white">Next →</button>
          </div>
        </div>
      </div>
    </section>
  );
}
