import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type CursorLabel = "view" | "open" | "connect" | "cv";

type Props = {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
  download?: string | boolean;
  cursor?: CursorLabel;
  icon?: React.ReactNode;
  arrow?: boolean;
  className?: string;
  ariaLabel?: string;
};

const variants = {
  dark: {
    primary: "bg-white text-black border-white hover:bg-transparent hover:text-white",
    secondary: "border-graphite text-white hover:border-white hover:bg-white hover:text-black",
    text: "border-transparent text-fog hover:text-white px-0",
  },
  light: {
    primary: "bg-black text-paper border-black hover:bg-transparent hover:text-black",
    secondary: "border-line-light text-black hover:border-black hover:bg-black hover:text-paper",
    text: "border-transparent text-muted-light hover:text-black px-0",
  },
} as const;

/** Square, monospace action used for every button-like link on the site (44px+ tap target). */
export function ActionLink({
  href,
  children,
  tone = "dark",
  variant = "secondary",
  external,
  download,
  cursor,
  icon,
  arrow,
  className,
  ariaLabel,
}: Props) {
  const isExternal = external ?? /^https?:/.test(href);
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      data-cursor={cursor ?? (isExternal ? "open" : undefined)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: typeof download === "string" ? download : "" } : {})}
      className={cn(
        "meta group inline-flex min-h-12 items-center justify-center gap-3 border px-6 transition-colors duration-300",
        variants[tone][variant],
        className,
      )}
    >
      {icon}
      <span>{children}</span>
      {arrow ? (
        <ArrowUpRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      ) : null}
    </a>
  );
}
