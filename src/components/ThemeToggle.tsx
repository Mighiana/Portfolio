"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const NIGHT = "#090909";
const DAY = "#faf9f6";

/** Day/night switch. The saved choice is applied before paint by the boot script in layout.tsx. */
export function ThemeToggle({ className }: { className?: string }) {
  const [day, setDay] = useState(false);

  useEffect(() => {
    setDay(document.documentElement.dataset.mode === "light");
  }, []);

  const toggle = () => {
    const next = !day;
    const html = document.documentElement;
    if (next) html.dataset.mode = "light";
    else delete html.dataset.mode;
    try {
      localStorage.setItem("mu:mode", next ? "light" : "dark");
    } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next ? DAY : NIGHT);
    setDay(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={day}
      aria-label="Day theme"
      title={day ? "Switch to night theme" : "Switch to day theme"}
      className={cn("grid min-h-11 min-w-11 place-items-center", className)}
    >
      <Sun aria-hidden className="mode-icon-day size-4" />
      <Moon aria-hidden className="mode-icon-night size-4" />
    </button>
  );
}
