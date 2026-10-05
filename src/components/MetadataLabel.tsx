import { cn } from "@/lib/cn";

type Props = { children: React.ReactNode; className?: string; as?: "span" | "p" | "dt" | "dd" | "div" };

export function MetadataLabel({ children, className, as: Tag = "span" }: Props) {
  return <Tag className={cn("meta", className)}>{children}</Tag>;
}
