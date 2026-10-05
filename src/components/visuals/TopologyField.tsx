"use client";

import { useRef } from "react";
import { useCanvasLoop } from "@/hooks/useCanvasLoop";

type Node = { x: number; y: number; z: number };

/** Slowly rotating 3D node field with proximity links. Hero background. */
export default function TopologyField({ className }: { className?: string }) {
  const nodes = useRef<Node[]>([]);

  const ref = useCanvasLoop(
    (ctx, w, h, t) => {
      const list = nodes.current;
      const cx = w * 0.62;
      const cy = h * 0.5;
      const scale = Math.max(w, h) * 0.55;
      const a = t * 0.035;
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      const tilt = 0.32;
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);
      const pts = list.map((n) => {
        const x = n.x * cos - n.z * sin;
        const z0 = n.x * sin + n.z * cos;
        const y = n.y * ct - z0 * st;
        const z = n.y * st + z0 * ct;
        const p = 2.4 / (2.4 + z);
        return { sx: cx + x * scale * p, sy: cy + y * scale * p, depth: (1 - z) / 2 };
      });

      const maxD = scale * 0.2;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].sx - pts[j].sx;
          const dy = pts[i].sy - pts[j].sy;
          const d = Math.hypot(dx, dy);
          if (d < maxD) {
            const alpha = (1 - d / maxD) * 0.22 * Math.min(pts[i].depth, pts[j].depth);
            ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pts[i].sx, pts[i].sy);
            ctx.lineTo(pts[j].sx, pts[j].sy);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        const s = 1 + p.depth * 1.4;
        ctx.fillStyle = `rgba(255,255,255,${(0.15 + p.depth * 0.5).toFixed(3)})`;
        ctx.fillRect(p.sx - s / 2, p.sy - s / 2, s, s);
      }
    },
    (w) => {
      if (nodes.current.length) return;
      const count = w < 640 ? 70 : 150;
      let seed = 7;
      const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
      nodes.current = Array.from({ length: count }, () => {
        // Layered grid-ish distribution: reads as infrastructure rather than noise.
        const layer = Math.round((rand() + 1) * 2) / 2 - 1;
        return { x: rand(), y: layer * 0.6 + rand() * 0.12, z: rand() };
      });
    },
  );

  return <canvas ref={ref} aria-hidden className={className} />;
}
