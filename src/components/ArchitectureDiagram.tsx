"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { DiagramNodeId } from "@/data/thesis";
import { cn } from "@/lib/cn";

type Stage = { id: DiagramNodeId; code: string; title: string[]; note: string; subs: { id: DiagramNodeId; label: string; note: string }[] };

export const stages: Stage[] = [
  {
    id: "framework",
    code: "E-01",
    title: ["CALDERA /", "framework result"],
    note: "What CALDERA says happened.",
    subs: [
      { id: "abilities", label: "ATT&CK abilities", note: "Candidate CALDERA abilities, currently under review." },
      { id: "operation", label: "Operation report", note: "Framework-reported execution outcome." },
    ],
  },
  {
    id: "endpoint",
    code: "E-02",
    title: ["Windows", "endpoint"],
    note: "Planned lab VM. Not deployed.",
    subs: [{ id: "isolation", label: "Isolated VM", note: "Controlled virtual machine inside the lab boundary." }],
  },
  {
    id: "groundtruth",
    code: "E-03",
    title: ["Sysmon /", "endpoint evidence"],
    note: "What actually happened on the endpoint.",
    subs: [{ id: "sysmon", label: "Sysmon events", note: "Independent record of endpoint activity." }],
  },
  {
    id: "ingestion",
    code: "E-04",
    title: ["Wazuh", "ingestion"],
    note: "What telemetry reached Wazuh.",
    subs: [{ id: "ingestcheck", label: "Ingestion check", note: "Endpoint events compared with events received." }],
  },
  { id: "alert", code: "E-05", title: ["Defensive alert /", "detection"], note: "What the defensive system detected.", subs: [] },
];

/** Stage drawn inside the controlled-lab boundary. */
const labStage = 1;
const ariaLabel =
  "Conceptual experimental architecture (planned, not deployed): CALDERA framework result, Windows endpoint, Sysmon endpoint evidence, Wazuh ingestion, defensive alert and detection.";

const allNotes = new Map<DiagramNodeId, { label: string; note: string }>();
for (const s of stages) {
  allNotes.set(s.id, { label: s.title.join(" "), note: s.note });
  for (const sub of s.subs) allNotes.set(sub.id, sub);
}

type Props = { focus?: DiagramNodeId[]; className?: string };

const stageIndex = (id: DiagramNodeId) => stages.findIndex((s) => s.id === id || s.subs.some((x) => x.id === id));

function useDiagramState(focus?: DiagramNodeId[]) {
  const [hovered, setHovered] = useState<DiagramNodeId | null>(null);
  const [pinned, setPinned] = useState<DiagramNodeId | null>(null);
  const hover = hovered ?? pinned;
  const activeStage = hover ? stageIndex(hover) : -1;
  const lit = (id: DiagramNodeId) => {
    if (!hover) return !focus || focus.includes(id);
    const parent = stages[activeStage]?.id;
    // Active node, its parent module, and (when a module is active) its sub-modules.
    return id === hover || id === parent || (hover === parent && stageIndex(id) === activeStage);
  };
  /** Arrow between stage i and i+1 is part of the active module's path. */
  const pathLit = (i: number) => activeStage < 0 || activeStage === i || activeStage === i + 1;
  const toggle = (id: DiagramNodeId) => setPinned((p) => (p === id ? null : id));
  const bind = (id: DiagramNodeId) => ({
    tabIndex: 0,
    role: "button" as const,
    "aria-pressed": pinned === id,
    "aria-label": `${allNotes.get(id)?.label}: ${allNotes.get(id)?.note}`,
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && setHovered(id),
    onPointerLeave: () => setHovered(null),
    onFocus: () => setHovered(id),
    onBlur: () => setHovered(null),
    onClick: () => toggle(id),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle(id);
      } else if (e.key === "Escape") {
        setPinned(null);
        (e.currentTarget as SVGElement).blur();
      }
    },
    className: "cursor-pointer outline-none [&:focus-visible>rect:first-of-type]:stroke-[2.5]",
  });
  return { hover, lit, pathLit, bind };
}

function Caption({ hover }: { hover: DiagramNodeId | null }) {
  const n = hover ? allNotes.get(hover) : null;
  return (
    <div className="meta mt-4 flex min-h-10 items-start gap-3 border-t border-graphite pt-3 text-ash" aria-live="polite">
      <span className="text-white">{n ? "Node" : "Hint"}</span>
      <span>{n ? `${n.label} — ${n.note}` : "Hover, focus or tap a module to inspect it."}</span>
    </div>
  );
}

// Same initial props on server and client (no hydration mismatch); reduced motion just skips the tween.
const draw = (reduce: boolean | null, delay = 0) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: "-15%" },
  transition: reduce ? { duration: 0 } : { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const useMounted = () => {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
};

/** Desktop: horizontal schematic, left → right. */
export function ArchitectureDiagramHorizontal({ focus, className }: Props) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const { hover, lit, pathLit, bind } = useDiagramState(focus);
  const W = 1000;
  const boxW = 152;
  const gap = (W - 40 - boxW * 5) / 4;
  const x = (i: number) => 20 + i * (boxW + gap);
  const top = 60;
  const boxH = 112;
  const flow = `M ${x(0) + boxW} ${top + boxH / 2} L ${x(4)} ${top + boxH / 2}`;

  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${W} 400`} className="h-auto w-full" role="group" aria-label={ariaLabel}>
        <defs>
          <marker id="arrow-h" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8" fill="none" stroke="#fff" strokeWidth="1" />
          </marker>
        </defs>

        {/* controlled-environment boundary */}
        <rect x={x(labStage) - 14} y={24} width={boxW + 28} height={360} fill="none" stroke="#9a9a9a" strokeWidth="1" className="dash-flow" opacity={lit("isolation") || lit("endpoint") ? 0.9 : 0.25} />
        <text x={x(labStage) - 14} y={16} fill="#9a9a9a" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.5">ISOLATED / CONTROLLED</text>

        {stages.slice(0, 4).map((_, i) => (
          <g key={i} style={{ opacity: pathLit(i) ? 1 : 0.2, transition: "opacity .4s" }}>
            <motion.line x1={x(i) + boxW} y1={top + boxH / 2} x2={x(i + 1) - 4} y2={top + boxH / 2} stroke="#fff" strokeWidth={hover && pathLit(i) ? 2 : 1} markerEnd="url(#arrow-h)" {...draw(reduce, 0.15 * i)} />
          </g>
        ))}

        {stages.map((s, i) => (
          <g key={s.id}>
            <g {...bind(s.id)} style={{ opacity: lit(s.id) ? 1 : 0.32, transition: "opacity .5s" }}>
              <rect x={x(i)} y={top} width={boxW} height={boxH} fill={hover === s.id ? "#fff" : "#090909"} stroke="#fff" strokeWidth={hover === s.id ? 2 : 1} />
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
                    <rect x={x(i) + 40} y={sy} width={boxW - 40} height="36" fill={hover === sub.id ? "#fff" : "#090909"} stroke={hover === sub.id ? "#fff" : "#9a9a9a"} strokeWidth={hover === sub.id ? 2 : 1} />
                    <rect x={x(i) + 21} y={sy + 15} width="6" height="6" fill="#fff" />
                    <text x={x(i) + 50} y={sy + 22} fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.4" fill={hover === sub.id ? "#000" : "#d8d8d8"}>{sub.label.toUpperCase()}</text>
                  </g>
                </g>
              );
            })}
          </g>
        ))}

        {mounted && !reduce ? (
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
  const mounted = useMounted();
  const { hover, lit, pathLit, bind } = useDiagramState(focus);
  const W = 340;
  const rowH = 132;
  const boxH = 74;
  const y = (i: number) => 16 + i * rowH;
  const H = y(4) + boxH + 16;

  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="group" aria-label={ariaLabel}>
        <defs>
          <marker id="arrow-v" viewBox="0 0 8 8" refX="4" refY="7" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L4 8 L8 0" fill="none" stroke="#fff" strokeWidth="1" transform="rotate(-90 4 4)" />
          </marker>
        </defs>
        <rect x="4" y={y(labStage) - 10} width={W - 8} height={boxH + 20} fill="none" stroke="#9a9a9a" className="dash-flow" opacity={lit("endpoint") || lit("isolation") ? 0.9 : 0.3} />
        {stages.slice(0, 4).map((_, i) => (
          <g key={i} style={{ opacity: pathLit(i) ? 1 : 0.2, transition: "opacity .4s" }}>
            <motion.line x1={36} y1={y(i) + boxH} x2={36} y2={y(i + 1) - 14} stroke="#fff" strokeWidth={hover && pathLit(i) ? 2 : 1} markerEnd="url(#arrow-v)" {...draw(reduce, 0.12 * i)} />
          </g>
        ))}
        {stages.map((s, i) => (
          <g key={s.id} {...bind(s.id)} style={{ opacity: lit(s.id) ? 1 : 0.35, transition: "opacity .5s" }}>
            <rect x="16" y={y(i)} width={W - 32} height={boxH} fill={hover === s.id ? "#fff" : "#090909"} stroke="#fff" strokeWidth={hover === s.id ? 2 : 1} />
            <text x="30" y={y(i) + 22} fontSize="11" fontFamily="var(--font-mono)" letterSpacing="1.5" fill={hover === s.id ? "#000" : "#9a9a9a"}>{s.code}</text>
            <text x="30" y={y(i) + 52} fontSize="15" fontWeight="600" fill={hover === s.id ? "#000" : "#fff"}>{s.title.join(" ").toUpperCase()}</text>
            {s.subs.length ? (
              <text x={W - 30} y={y(i) + 22} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" fill={hover === s.id ? "#000" : "#9a9a9a"}>
                {s.subs.length} SUB
              </text>
            ) : null}
          </g>
        ))}
        {mounted && !reduce ? (
          <rect width="6" height="6" x="-3" y="-3" fill="#fff">
            <animateMotion dur="7s" repeatCount="indefinite" path={`M 36 ${y(0) + boxH} L 36 ${y(4)}`} />
          </rect>
        ) : null}
      </svg>
      <ul className="mt-2 grid gap-px border border-graphite bg-graphite">
        {stages.flatMap((s) => s.subs.map((sub) => ({ ...sub, parent: s.code }))).map((sub) => (
          <li key={sub.id} className="bg-ink">
            <button
              type="button"
              aria-pressed={hover === sub.id}
              onClick={bind(sub.id).onClick}
              className={cn("meta flex min-h-11 w-full items-center justify-between px-3 text-left transition-colors", hover === sub.id ? "bg-white text-black" : lit(sub.id) ? "text-fog" : "text-ash")}
            >
              <span>{sub.label}</span>
              <span className={hover === sub.id ? "text-black" : "text-ash"}>{sub.parent}</span>
            </button>
          </li>
        ))}
      </ul>
      <Caption hover={hover} />
    </figure>
  );
}
