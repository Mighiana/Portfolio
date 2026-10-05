"use client";

import { useEffect, useRef } from "react";

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;
type Setup = (w: number, h: number) => void;

/** DPR-aware canvas loop that pauses offscreen / in background tabs and draws one static frame for reduced motion. */
export function useCanvasLoop(draw: Draw, setup?: Setup) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  const setupRef = useRef(setup);
  drawRef.current = draw;
  setupRef.current = setup;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let frame = 0;
    let running = false;
    let t = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setupRef.current?.(w, h);
      render();
    };
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      drawRef.current(ctx, w, h, t);
    };
    const loop = (now: number) => {
      t += Math.min(now - last, 50) / 1000;
      last = now;
      render();
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    let inView = false;
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView && !document.hidden) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden || !inView ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    resize();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return ref;
}
