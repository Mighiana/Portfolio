"use client";

import { useMemo } from "react";
import { useCanvasLoop } from "@/hooks/useCanvasLoop";

/** Fibonacci point-cloud sphere with a few great-circle links. Contact background. */
export default function NodeSphere({ className }: { className?: string }) {
  const points = useMemo(() => {
    const n = 420;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: n }, (_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      return { x: Math.cos(th) * r, y, z: Math.sin(th) * r };
    });
  }, []);
  const links = useMemo(() => [[12, 201], [64, 333], [150, 290], [40, 120], [222, 380], [90, 260], [300, 410]], []);

  const ref = useCanvasLoop((ctx, w, h, t) => {
    const R = Math.min(w, h) * 0.42;
    const cx = w / 2;
    const cy = h / 2;
    const a = t * 0.06;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const tilt = -0.4;
    const ct = Math.cos(tilt);
    const st = Math.sin(tilt);
    const project = (p: { x: number; y: number; z: number }) => {
      const x = p.x * cos - p.z * sin;
      const z0 = p.x * sin + p.z * cos;
      const y = p.y * ct - z0 * st;
      const z = p.y * st + z0 * ct;
      return { x: cx + x * R, y: cy + y * R, z };
    };

    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx, cy, R * 1.25, R * 0.32, -0.25, 0, Math.PI * 2);
    ctx.stroke();

    for (const p of points) {
      const q = project(p);
      const front = (q.z + 1) / 2;
      ctx.fillStyle = `rgba(255,255,255,${(0.06 + front * 0.55).toFixed(3)})`;
      const s = 0.8 + front * 1.2;
      ctx.fillRect(q.x - s / 2, q.y - s / 2, s, s);
    }

    for (const [i, j] of links) {
      const p = points[i];
      const q = points[j];
      ctx.beginPath();
      for (let k = 0; k <= 24; k++) {
        const f = k / 24;
        let x = p.x + (q.x - p.x) * f;
        let y = p.y + (q.y - p.y) * f;
        let z = p.z + (q.z - p.z) * f;
        const len = Math.hypot(x, y, z) || 1;
        const lift = 1 + Math.sin(f * Math.PI) * 0.18;
        x = (x / len) * lift;
        y = (y / len) * lift;
        z = (z / len) * lift;
        const s = project({ x, y, z });
        if (k === 0) ctx.moveTo(s.x, s.y);
        else ctx.lineTo(s.x, s.y);
      }
      ctx.strokeStyle = "rgba(255,255,255,0.22)";
      ctx.stroke();
    }
  });

  return <canvas ref={ref} aria-hidden className={className} />;
}
