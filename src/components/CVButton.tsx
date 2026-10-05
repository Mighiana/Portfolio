import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { ActionLink } from "./ActionLink";

type Props = {
  tone?: "dark" | "light";
  variant?: "primary" | "secondary" | "text";
  className?: string;
  label?: string;
};

/** Every CV action opens the same file (profile.cvPath) in a new tab. */
export function CVButton({ tone = "dark", variant = "secondary", className, label }: Props) {
  return (
    <ActionLink
      href={profile.cvPath}
      tone={tone}
      variant={variant}
      cursor="cv"
      external
      icon={<Download aria-hidden className="size-3.5" />}
      className={className}
      ariaLabel="Open CV (PDF) in a new tab"
    >
      {label ?? "Download CV"}
    </ActionLink>
  );
}
