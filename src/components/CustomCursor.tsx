"use client";

import { useEffect, useRef, useState } from "react";
import type { CursorLabel } from "./ActionLink";

const labels: Record<CursorLabel, string> = { view: "View", open: "Open", connect: "Connect", cv: "CV" };

/** Dot + lagging ring; ring expands with a label over `[data-cursor]`. Fine pointers only, off for reduced motion. */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<CursorLabel | "hover" | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduce.matches);
    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame = 0;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!frame) frame = requestAnimationFrame(tick);
      setVisible(true);
    };
    const onOver = (e: Event) => {
      const el = (e.target as Element | null)?.closest?.("[data-cursor], a, button, [role='tab']");
      if (!el) return setLabel(null);
      const value = el.getAttribute("data-cursor") as CursorLabel | null;
      setLabel(value && value in labels ? value : "hover");
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  const text = label && label !== "hover" ? labels[label] : null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200] mix-blend-difference" style={{ opacity: visible ? 1 : 0 }}>
      <div ref={dot} className="absolute left-0 top-0 -ml-[2px] -mt-[2px] size-1 bg-white" style={{ opacity: text ? 0 : 1 }} />
      <div ref={ring} className="absolute left-0 top-0">
        <div
          className="meta flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white text-[10px] text-white transition-[width,height,background-color,color] duration-300 ease-out"
          style={{
            width: text ? 64 : label === "hover" ? 40 : 26,
            height: text ? 64 : label === "hover" ? 40 : 26,
            backgroundColor: text ? "#fff" : "transparent",
            color: "#000",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
