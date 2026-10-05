import { profile } from "@/data/profile";

/** CSS-driven (~1s). Shown only on the first visit per session; skipped for reduced motion and no-JS. */
export function Preloader() {
  return (
    <div aria-hidden className="preloader pointer-events-none fixed inset-0 z-[150] flex-col items-center justify-center bg-ink text-white">
      <div className="text-5xl font-semibold tracking-[-0.06em]">{profile.monogram}</div>
      <div className="mt-6 h-px w-28 bg-graphite">
        <div className="preloader-bar h-px w-full bg-white" />
      </div>
      <div className="meta mt-4 text-ash">System initialized</div>
    </div>
  );
}
