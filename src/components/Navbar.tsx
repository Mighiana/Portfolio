"use client";

import { useEffect, useRef, useState } from "react";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { useSectionState } from "@/hooks/useSectionState";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const { active, theme, scrolled } = useSectionState(64);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const light = theme === "light" && !open;

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const mq = window.matchMedia("(min-width: 64rem)");
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,color,backdrop-filter] duration-500",
          light ? "text-black" : "text-white",
          scrolled && !open
            ? light
              ? "border-line-light bg-paper/85 backdrop-blur-md"
              : "border-graphite bg-ink/80 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-6">
          <a href="#home" aria-label={`${profile.name} — home`} className="group flex min-h-11 items-center gap-3">
            <span
              className={cn(
                "grid size-8 place-items-center border text-[13px] font-semibold tracking-[-0.04em] transition-colors",
                light ? "border-black group-hover:bg-black group-hover:text-paper" : "border-white group-hover:bg-white group-hover:text-black",
              )}
            >
              {profile.monogram}
            </span>
            <span className={cn("meta hidden sm:inline", light ? "text-muted-light" : "text-ash")}>Usman.system</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "meta group relative flex min-h-11 items-center gap-2 px-3 transition-colors",
                      isActive ? "" : light ? "text-muted-light hover:text-black" : "text-ash hover:text-white",
                    )}
                  >
                    <span className={cn("tabular-nums", isActive ? "opacity-100" : "opacity-60")}>{item.index}</span>
                    <span>{item.label}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 bottom-2 h-px origin-left transition-transform duration-500",
                        light ? "bg-black" : "bg-white",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="cv"
              aria-label="Open CV (PDF) in a new tab"
              className={cn(
                "meta hidden min-h-10 items-center whitespace-nowrap border px-4 transition-colors sm:inline-flex",
                light ? "border-black hover:bg-black hover:text-paper" : "border-white hover:bg-white hover:text-black",
              )}
            >
              Resume ↗
            </a>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="meta flex min-h-11 min-w-11 items-center justify-end gap-3 lg:hidden"
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span className={cn("absolute left-0 h-px w-6 bg-current transition-transform duration-500", open ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-px w-6 bg-current transition-transform duration-500", open ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={open} active={active} onClose={() => { setOpen(false); triggerRef.current?.focus(); }} />
    </>
  );
}
