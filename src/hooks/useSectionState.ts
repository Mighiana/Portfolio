"use client";

import { useEffect, useState } from "react";

type State = { active: string; theme: "dark" | "light"; scrolled: boolean };

/**
 * Reads `data-nav` (parent nav id) and `data-theme` from the `<section>` under
 * two probe lines: one at the nav bar (for colour) and one mid-viewport (for active item).
 */
export function useSectionState(navHeight = 64): State {
  const [state, setState] = useState<State>({ active: "home", theme: "dark", scrolled: false });

  useEffect(() => {
    let frame = 0;
    const sections = () => Array.from(document.querySelectorAll<HTMLElement>("section[data-nav]"));
    const at = (list: HTMLElement[], y: number) =>
      list.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= y && r.bottom > y;
      });

    const update = () => {
      frame = 0;
      const list = sections();
      const barSection = at(list, navHeight / 2);
      const midSection = at(list, window.innerHeight * 0.4);
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const next: State = {
        theme: (barSection?.dataset.theme as State["theme"]) ?? "dark",
        active: nearBottom ? (list.at(-1)?.dataset.nav ?? "contact") : (midSection?.dataset.nav ?? "home"),
        scrolled: window.scrollY > 24,
      };
      setState((prev) =>
        prev.active === next.active && prev.theme === next.theme && prev.scrolled === next.scrolled ? prev : next,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [navHeight]);

  return state;
}
