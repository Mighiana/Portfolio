import { cn } from "@/lib/cn";

type Props = {
  index: string;
  label: string;
  aside?: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

/** `03 / SELECTED WORK ———————— aside` */
export function SectionHeader({ index, label, aside, tone = "dark", className }: Props) {
  const muted = tone === "dark" ? "text-ash" : "text-muted-light";
  const rule = tone === "dark" ? "bg-line-dark" : "bg-line-light";
  return (
    <div className={cn("reveal flex items-center gap-4", className)}>
      <span className={cn("meta whitespace-nowrap", muted)}>
        <span className={tone === "dark" ? "text-white" : "text-black"}>{index}</span> / {label}
      </span>
      <span aria-hidden className={cn("h-px flex-1", rule)} />
      {aside ? <span className={cn("meta hidden whitespace-nowrap sm:inline", muted)}>{aside}</span> : null}
    </div>
  );
}
