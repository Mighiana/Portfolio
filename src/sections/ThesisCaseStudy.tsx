"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { ArchitectureDiagramHorizontal, ArchitectureDiagramVertical } from "@/components/ArchitectureDiagram";
import { SectionHeader } from "@/components/SectionHeader";
import { chapters, thesis, type Chapter, type ChapterBlock } from "@/data/thesis";
import { cn } from "@/lib/cn";

function Block({ b }: { b: ChapterBlock }) {
  return (
    <div>
      <p className="meta mb-3 text-ash">{b.caption}</p>
      {b.chips ? (
        <ul className={cn("flex flex-wrap gap-2", b.items && "mb-3")}>
          {b.chips.map((chip) => (
            <li key={chip} className="meta border border-graphite px-2.5 py-1.5 text-fog">{chip}</li>
          ))}
        </ul>
      ) : null}
      {b.items ? (
        <dl className="grid grid-cols-1 border-l border-t border-graphite sm:grid-cols-2">
          {b.items.map((p, i) => (
            <div key={p.label} className="border-b border-r border-graphite p-4 md:p-5">
              <dt className="meta flex justify-between gap-3 text-white">
                <span>{p.label}</span>
                <span className={cn("shrink-0 tabular-nums", p.tag === "Current" ? "text-white" : "text-ash")}>
                  {p.tag ?? String(i + 1).padStart(2, "0")}
                </span>
              </dt>
              <dd className="mt-2.5 text-[15px] leading-relaxed text-fog">{p.text}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}

function Panel({ c }: { c: Chapter }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <p className="meta text-ash">
          <span className="text-white">{c.index}</span> / {c.title}
        </p>
        <h3 className="mt-4 text-[clamp(1.6rem,3.6vw,3rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em] md:mt-5">{c.heading}</h3>
      </div>
      <div className="flex flex-col gap-6 lg:col-span-7">
        {c.body.map((b, i) => (
          <p key={i} className="max-w-2xl text-base leading-relaxed text-fog md:text-lg">{b}</p>
        ))}
        {c.status ? (
          <div className="flex flex-col gap-3 border border-dashed border-ash p-5">
            <span className="meta text-ash">{c.status.label}</span>
            <span className="text-[clamp(1.25rem,2.6vw,2rem)] font-semibold uppercase leading-tight tracking-[-0.02em]">{c.status.value}</span>
            <span className="max-w-2xl text-[15px] leading-relaxed text-fog">{c.status.text}</span>
          </div>
        ) : null}
        {c.blocks?.map((b) => <Block key={b.caption} b={b} />)}
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
      {/* Chapter opener: research problem leads, official title stays visible */}
      <div className="shell flex flex-col pb-10 pt-16 md:pt-24">
        <SectionHeader index="03.1" label="Flagship case study" aside="Thesis / 2026–2027" />
        <div className="flex flex-col py-8 md:py-12">
          <p className="reveal meta flex items-center gap-3 text-fog">
            <span aria-hidden className="size-1.5 bg-white" /> {thesis.label}
          </p>
          <p className="display reveal-lines mt-6 text-[clamp(2.1rem,5.4vw,5.25rem)] leading-[0.92] md:mt-8">
            {thesis.statementLines.map((l, i) => (
              <span key={l} className={cn("line", i === 1 ? "text-fog" : "text-white")} style={{ ["--i" as string]: i }}>
                <span>{l}</span>
              </span>
            ))}
          </p>
          <p className="reveal mt-6 max-w-2xl text-base leading-relaxed text-fog md:text-lg">{thesis.subtitle}</p>
          <div className="reveal mt-8 border-t border-graphite pt-5 md:mt-10">
            <p className="meta text-ash">Official title</p>
            <h2 id="thesis-title" className="mt-2 max-w-3xl text-[clamp(1.15rem,2vw,1.6rem)] font-semibold uppercase leading-tight tracking-[-0.02em] text-white">
              {thesis.title}
            </h2>
          </div>
        </div>
        <dl className="reveal grid grid-cols-2 border-l border-t border-graphite md:grid-cols-4">
          {thesis.meta.map((m) => (
            <div key={m.label} className="border-b border-r border-graphite p-4 md:p-5">
              <dt className="meta text-ash">{m.label}</dt>
              <dd className="mt-2.5 text-[15px] font-medium leading-snug md:text-base">{m.value}</dd>
            </div>
          ))}
        </dl>
        <div className="reveal meta mt-5 flex flex-col gap-2 text-ash md:flex-row md:justify-between md:gap-6">
          <p>Scope — {thesis.scope}</p>
          <p className="shrink-0">{thesis.supervision.label} — <span className="text-fog">{thesis.supervision.value}</span></p>
        </div>
      </div>

      {/* Architecture figure */}
      <div className="border-t border-graphite">
        <div className="shell py-12 md:py-20">
          <div className="reveal meta mb-6 flex items-start justify-between gap-4 text-ash md:mb-10">
            <span><span className="text-white">FIG. T-01</span> — Conceptual experimental architecture <span className="text-fog">/ Planned — not deployed</span></span>
            <span className="hidden shrink-0 sm:inline">Highlight: {chapter.title}</span>
          </div>
          <ArchitectureDiagramHorizontal focus={chapter.focus} className="reveal hidden md:block" />
          <ArchitectureDiagramVertical focus={chapter.focus} className="reveal md:hidden" />
        </div>
      </div>

      {/* Dossier chapters */}
      <div className="border-t border-graphite">
        <div className="shell py-12 md:py-20">
          <div role="tablist" aria-label="Case study chapters" onKeyDown={onKey} className="grid grid-cols-2 border-l border-t border-graphite sm:grid-cols-3 lg:grid-cols-6">
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
                  "meta relative flex min-h-14 items-center gap-2 border-b border-r border-graphite px-3 py-3 text-left transition-colors",
                  i === active ? "text-white" : "text-ash hover:text-fog",
                )}
              >
                <span className="shrink-0 tabular-nums">{c.index}</span>
                <span>{c.title}</span>
                <span aria-hidden className={cn("absolute inset-x-0 -bottom-px h-px bg-white transition-transform duration-500", i === active ? "scale-x-100" : "scale-x-0")} />
              </button>
            ))}
          </div>

          <div className="relative mt-8 md:mt-10 md:min-h-[22rem]">
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

          <div className="meta mt-8 flex items-center justify-between border-t border-graphite pt-4 text-ash md:mt-10">
            <button type="button" onClick={() => setActive((active - 1 + chapters.length) % chapters.length)} className="min-h-11 hover:text-white">← Prev</button>
            <span className="tabular-nums">{chapter.index} / {String(chapters.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => setActive((active + 1) % chapters.length)} className="min-h-11 hover:text-white">Next →</button>
          </div>
        </div>
      </div>
    </section>
  );
}
