import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { ActionLink } from "./ActionLink";

type Props = {
  tone?: "dark" | "light";
  variant?: "primary" | "secondary" | "text";
  /** "download" saves the PDF; "preview" opens it in a new tab. */
  mode?: "download" | "preview";
  className?: string;
  label?: string;
};

/** Every CV action points at the same file from profile.cvPath. */
export function CVButton({ tone = "dark", variant = "secondary", mode = "download", className, label }: Props) {
  const preview = mode === "preview";
  return (
    <ActionLink
      href={profile.cvPath}
      tone={tone}
      variant={variant}
      cursor="cv"
      external={preview}
      download={preview ? undefined : profile.cvFileName}
      arrow={preview}
      icon={preview ? undefined : <Download aria-hidden className="size-3.5" />}
      className={className}
      ariaLabel={preview ? "Open CV (PDF) in a new tab" : "Download CV (PDF)"}
    >
      {label ?? (preview ? "Resume" : "Download CV")}
    </ActionLink>
  );
}
