"use client";

import { Play, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProjectDemo } from "@/data/projects";

/**
 * Short muted evidence clip. Sources load only near the viewport, autoplay only
 * while visible on wide screens; reduced motion, Save-Data and small screens get
 * the poster and an explicit play button instead.
 */
export function DemoClip({ demo }: { demo: ProjectDemo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [auto, setAuto] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const update = () =>
      setAuto(
        !matchMedia("(prefers-reduced-motion: reduce)").matches &&
          matchMedia("(min-width: 768px)").matches &&
          !conn?.saveData,
      );
    update();
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const loader = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          loader.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    loader.observe(v);
    return () => loader.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !near) return;
    v.load();
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && auto) v.play().catch(() => {});
        else if (!e.isIntersecting) v.pause();
      },
      { threshold: 0.5 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [near, auto]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <figure className="relative z-10 border border-graphite bg-ink">
      <figcaption className="meta flex items-baseline justify-between gap-3 border-b border-graphite px-3 py-2.5">
        <span className="text-white">{demo.label}</span>
        {demo.source ? <span className="text-ash">{demo.source}</span> : null}
      </figcaption>
      <div className="relative">
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          poster={demo.poster}
          width={demo.width}
          height={demo.height}
          aria-label={demo.alt}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="block h-auto w-full"
        >
          {near ? (
            <>
              <source src={demo.webm} type="video/webm" />
              <source src={demo.mp4} type="video/mp4" />
            </>
          ) : null}
        </video>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause: ${demo.label}` : `Play: ${demo.label}`}
          className="meta absolute bottom-2 right-2 inline-flex min-h-9 items-center gap-1.5 border border-white bg-black/80 px-2.5 text-white hover:bg-white hover:text-black"
        >
          {playing ? <Pause aria-hidden className="size-3" /> : <Play aria-hidden className="size-3" />}
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      {demo.note ? <p className="border-t border-graphite px-3 py-2.5 text-[13px] leading-relaxed text-fog">{demo.note}</p> : null}
    </figure>
  );
}
