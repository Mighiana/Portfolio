"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { CVButton } from "./CVButton";

type Props = { open: boolean; active: string; onClose: () => void };

export function MobileMenu({ open, active, onClose }: Props) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-ink pt-16 text-white lg:hidden"
        >
          <div className="shell flex flex-1 flex-col justify-between gap-10 py-8">
            <div>
              <p className="meta mb-6 border-b border-graphite pb-4 text-ash">Index</p>
              <ul>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.05 + i * 0.04 }}
                    className="border-b border-graphite"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={onClose}
                      aria-current={active === item.id ? "location" : undefined}
                      className="group flex min-h-16 items-baseline gap-5 py-3"
                    >
                      <span className="meta w-6 text-ash tabular-nums">{item.index}</span>
                      <span
                        className={cn(
                          "text-[clamp(2.25rem,11vw,3.5rem)] font-semibold uppercase leading-none tracking-[-0.04em] transition-colors",
                          active === item.id ? "text-white" : "text-fog/70 group-hover:text-white",
                        )}
                      >
                        {item.label}
                      </span>
                      {active === item.id ? <span aria-hidden className="ml-auto size-1.5 self-center bg-white" /> : null}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              <CVButton variant="primary" className="w-full" />
              <div className="grid grid-cols-2 gap-3">
                {profile.github ? (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="meta flex min-h-12 items-center justify-center border border-graphite">
                    GitHub ↗
                  </a>
                ) : null}
                {profile.linkedin ? (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="meta flex min-h-12 items-center justify-center border border-graphite">
                    LinkedIn ↗
                  </a>
                ) : null}
              </div>
              <p className="meta mt-3 flex justify-between text-ash">
                <span>{profile.locationShort}</span>
                <span>Graduating {profile.graduation}</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
