"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { DiagramNodeId } from "@/data/thesis";
import { cn } from "@/lib/cn";

type Stage = { id: DiagramNodeId; code: string; title: string[]; note: string; subs: { id: DiagramNodeId; label: string; note: string }[] };

export const stages: Stage[] = [
  { id: "attacker", code: "M-01", title: ["Test /", "attacker machine"], note: "Starts and supervises test runs.", subs: [] },
  {
    id: "framework",
    code: "M-02",
    title: ["Automation", "framework"],
    note: "Sequences test stages in a defined, repeatable order.",
    subs: [
      { id: "recon", label: "Reconnaissance", note: "Discovery stage scoped to the lab." },
      { id: "modules", label: "Test modules", note: "Self-contained, configurable test steps." },
      { id: "execution", label: "Execution", note: "Ordered, logged runs of selected modules." },
    ],
  },
  {
    id: "environment",
    code: "M-03",
    title: ["Controlled target", "environment"],
    note: "Isolated systems that exist only for the exercise.",
    subs: [
      { id: "targets", label: "Target systems", note: "Lab-only hosts under test." },
      { id: "segmentation", label: "Segmentation", note: "Keeps the exercise inside its boundary." },
    ],
  },
  {
    id: "logging",
    code: "M-04",
    title: ["Logging &", "monitoring"],
    note: "Captures what happened during every run.",
    subs: [{ id: "monitoring", label: "Monitoring", note: "Observes the environment while tests run." }],
  },
  { id: "reporting", code: "M-05", title: ["Reporting /", "analysis"], note: "Turns collected evidence into a reviewable report.", subs: [] },
];

const allNotes = new Map<DiagramNodeId, { label: string; note: string }>();
for (const s of stages) {
  allNotes.set(s.id, { label: s.title.join(" "), note: s.note });
  for (const sub of s.subs) allNotes.set(sub.id, sub);
}

type Props = { focus?: DiagramNodeId[]; className?: string };

function useDiagramState(focus?: DiagramNodeId[]) {
  const [hover, setHover] = useState<DiagramNodeId | null>(null);
  const lit = (id: DiagramNodeId) => (hover ? hover === id : !focus || focus.includes(id));
  const bind = (id: DiagramNodeId) => ({
    tabIndex: 0,
    role: "button" as const,
    "aria-label": `${allNotes.get(id)?.label}: ${allNotes.get(id)?.note}`,
    onPointerEnter: () => setHover(id),
    onPointerLeave: () => setHover(null),
    onFocus: () => setHover(id),
    onBlur: () => setHover(null),
    className: "outline-none [&:focus-visible>rect:first-of-type]:stroke-[2]",
  });
  return { hover, lit, bind };
}

function Caption({ hover }: { hover: DiagramNodeId | null }) {
  const n = hover ? allNotes.get(hover) : null;
  return (
    <div className="meta mt-4 flex min-h-10 items-start gap-3 border-t border-graphite pt-3 text-ash" aria-live="polite">
      <span className="text-white">{n ? "Node" : "Hint"}</span>
      <span>{n ? `${n.label} — ${n.note}` : "Hover or focus a module to inspect it."}</span>
    </div>
  );
}

const draw = (reduce: boolean | null, delay = 0) =>
  reduce
    ? {}
    : {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 1 },
        viewport: { once: true, margin: "-15%" },
        transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] as const },
      };

/** Desktop: horizontal schematic, left → right. */
export function ArchitectureDiagramHorizontal({ focus, className }: Props) {
  const reduce = useReducedMotion();
  const { hover, lit, bind } = useDiagramState(focus);
  const W = 1000;
  const boxW = 152;
  const gap = (W - 40 - boxW * 5) / 4;
  const x = (i: number) => 20 + i * (boxW + gap);
  const top = 60;
  const boxH = 112;
  const flow = `M ${x(0) + boxW} ${top + boxH / 2} L ${x(4)} ${top + boxH / 2}`;

  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${W} 400`} className="h-auto w-full" role="group" aria-label="Thesis architecture: test machine, automation framework, controlled target environment, logging and monitoring, reporting and analysis.">
        <defs>
          <marker id="arrow-h" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8" fill="none" stroke="#fff" strokeWidth="1" />
          </marker>
        </defs>

        {/* controlled-environment boundary */}
        <rect x={x(2) - 14} y={24} width={boxW + 28} height={360} fill="none" stroke="#9a9a9a" strokeWidth="1" className="dash-flow" opacity={lit("segmentation") || lit("environment") ? 0.9 : 0.25} />
        <text x={x(2) - 14} y={16} fill="#9a9a9a" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.5">ISOLATED / SEGMENTED</text>

        {stages.slice(0, 4).map((_, i) => (
          <motion.line key={i} x1={x(i) + boxW} y1={top + boxH / 2} x2={x(i + 1) - 4} y2={top + boxH / 2} stroke="#fff" strokeWidth="1" markerEnd="url(#arrow-h)" {...draw(reduce, 0.15 * i)} />
        ))}

        {stages.map((s, i) => (
          <g key={s.id}>
            <g {...bind(s.id)} style={{ opacity: lit(s.id) ? 1 : 0.32, transition: "opacity .5s" }}>
              <rect x={x(i)} y={top} width={boxW} height={boxH} fill={hover === s.id ? "#fff" : "#090909"} stroke="#fff" strokeWidth="1" />
              <text x={x(i) + 12} y={top + 22} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.5" fill={hover === s.id ? "#000" : "#9a9a9a"}>{s.code}</text>
              {s.title.map((t, k) => (
                <text key={k} x={x(i) + 12} y={top + 72 + k * 18} fontSize="12" fontWeight="600" letterSpacing="-0.2" fill={hover === s.id ? "#000" : "#fff"}>{t.toUpperCase()}</text>
              ))}
              <rect x={x(i) + boxW - 16} y={top + 10} width="6" height="6" fill={hover === s.id ? "#000" : "#fff"} />
            </g>
            {s.subs.map((sub, k) => {
              const sy = top + boxH + 40 + k * 52;
              return (
                <g key={sub.id}>
                  <motion.line x1={x(i) + 24} y1={top + boxH} x2={x(i) + 24} y2={sy + 18} stroke="#9a9a9a" strokeWidth="1" {...draw(reduce, 0.6 + k * 0.1)} style={{ opacity: lit(sub.id) ? 0.9 : 0.25 }} />
                  <g {...bind(sub.id)} style={{ opacity: lit(sub.id) ? 1 : 0.32, transition: "opacity .5s" }}>
                    <rect x={x(i) + 40} y={sy} width={boxW - 40} height="36" fill={hover === sub.id ? "#fff" : "#090909"} stroke="#9a9a9a" strokeWidth="1" />
                    <rect x={x(i) + 21} y={sy + 15} width="6" height="6" fill="#fff" />
                    <text x={x(i) + 50} y={sy + 22} fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.4" fill={hover === sub.id ? "#000" : "#d8d8d8"}>{sub.label.toUpperCase()}</text>
                  </g>
                </g>
              );
            })}
          </g>
        ))}

        {!reduce ? (
          <rect width="6" height="6" x="-3" y="-3" fill="#fff">
            <animateMotion dur="7s" repeatCount="indefinite" path={flow} />
          </rect>
        ) : null}
      </svg>
      <Caption hover={hover} />
    </figure>
  );
}

/** Mobile: vertical schematic, top → bottom, simplified sub-modules. */
export function ArchitectureDiagramVertical({ focus, className }: Props) {
  const reduce = useReducedMotion();
  const { hover, lit, bind } = useDiagramState(focus);
  const W = 340;
  const rowH = 132;
  const boxH = 74;
  const y = (i: number) => 16 + i * rowH;
  const H = y(4) + boxH + 16;

  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="group" aria-label="Thesis architecture, top to bottom: test machine, automation framework, controlled target environment, logging and monitoring, reporting and analysis.">
        <defs>
          <marker id="arrow-v" viewBox="0 0 8 8" refX="4" refY="7" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L4 8 L8 0" fill="none" stroke="#fff" strokeWidth="1" transform="rotate(-90 4 4)" />
          </marker>
        </defs>
        <rect x="4" y={y(2) - 10} width={W - 8} height={boxH + 20} fill="none" stroke="#9a9a9a" className="dash-flow" opacity={lit("environment") || lit("segmentation") ? 0.9 : 0.3} />
        {stages.slice(0, 4).map((_, i) => (
          <motion.line key={i} x1={36} y1={y(i) + boxH} x2={36} y2={y(i + 1) - 14} stroke="#fff" strokeWidth="1" markerEnd="url(#arrow-v)" {...draw(reduce, 0.12 * i)} />
        ))}
        {stages.map((s, i) => (
          <g key={s.id} {...bind(s.id)} style={{ opacity: lit(s.id) ? 1 : 0.35, transition: "opacity .5s" }}>
            <rect x="16" y={y(i)} width={W - 32} height={boxH} fill={hover === s.id ? "#fff" : "#090909"} stroke="#fff" />
            <text x="30" y={y(i) + 22} fontSize="11" fontFamily="var(--font-mono)" letterSpacing="1.5" fill={hover === s.id ? "#000" : "#9a9a9a"}>{s.code}</text>
            <text x="30" y={y(i) + 52} fontSize="15" fontWeight="600" fill={hover === s.id ? "#000" : "#fff"}>{s.title.join(" ").toUpperCase()}</text>
            {s.subs.length ? (
              <text x={W - 30} y={y(i) + 22} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" fill={hover === s.id ? "#000" : "#9a9a9a"}>
                {s.subs.length} SUB
              </text>
            ) : null}
          </g>
        ))}
        {!reduce ? (
          <rect width="6" height="6" x="-3" y="-3" fill="#fff">
            <animateMotion dur="7s" repeatCount="indefinite" path={`M 36 ${y(0) + boxH} L 36 ${y(4)}`} />
          </rect>
        ) : null}
      </svg>
      <ul className="mt-2 grid gap-px border border-graphite bg-graphite">
        {stages.flatMap((s) => s.subs.map((sub) => ({ ...sub, parent: s.code }))).map((sub) => (
          <li key={sub.id} className={cn("meta flex justify-between bg-ink px-3 py-2.5", lit(sub.id) ? "text-fog" : "text-ash/60")}>
            <span>{sub.label}</span>
            <span className="text-ash">{sub.parent}</span>
          </li>
        ))}
      </ul>
      <Caption hover={hover} />
    </figure>
  );
}
