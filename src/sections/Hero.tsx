import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/ActionLink";
import { CVButton } from "@/components/CVButton";
import { LazyTopologyField } from "@/components/visuals/LazyVisuals";
import { profile } from "@/data/profile";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` });

export function Hero() {
  const meta = [
    { k: "Location", v: profile.locationShort },
    { k: "Status", v: profile.status },
    { k: "Graduation", v: profile.graduation },
  ];
  return (
    <section id="home" data-nav="home" data-theme="dark" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-16 text-white">
      <div aria-hidden className="intro absolute inset-0 -z-10" style={d(400)}>
        <LazyTopologyField className="h-full w-full opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      </div>

      <div className="shell flex flex-1 flex-col">
        <div className="intro meta flex items-center justify-between gap-4 border-b border-graphite py-4 text-ash" style={d(0)}>
          <span>{profile.monogram} / 001</span>
          <span className="hidden md:inline">Portfolio — Index</span>
          <span className="flex items-center gap-2 text-fog">
            <span aria-hidden className="pulse size-1.5 rounded-full bg-white" />
            System online
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-12 md:py-16">
          <p className="intro meta mb-6 text-ash md:mb-8" style={d(100)}>{profile.discipline}</p>

          <h1 id="hero-title" className="display text-[clamp(2.6rem,13.4vw,14.5rem)]">
            <span className="line intro-line"><span style={d(150)}>{profile.firstName}</span></span>
            <span className="line intro-line"><span style={d(260)}>{profile.lastName}</span></span>
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 lg:grid-cols-12">
            <div className="intro lg:col-span-6" style={d(500)}>
              <p className="meta text-[13px] tracking-[0.22em] text-white">{profile.positioning}</p>
              <p className="mt-4 max-w-md text-lg leading-snug text-fog md:text-xl">{profile.statement}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ActionLink href="#projects" variant="primary" cursor="view" icon={<ArrowDown aria-hidden className="size-3.5" />}>
                  View projects
                </ActionLink>
                <CVButton variant="secondary" />
              </div>
              <div className="mt-5 flex gap-6">
                {profile.github ? (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" data-cursor="open" className="meta inline-flex min-h-11 items-center gap-1.5 text-ash hover:text-white">
                    GitHub <ArrowUpRight aria-hidden className="size-3" />
                  </a>
                ) : null}
                {profile.linkedin ? (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="open" className="meta inline-flex min-h-11 items-center gap-1.5 text-ash hover:text-white">
                    LinkedIn <ArrowUpRight aria-hidden className="size-3" />
                  </a>
                ) : null}
              </div>
            </div>

            <dl className="intro grid grid-cols-3 self-end border-t border-graphite lg:col-span-5 lg:col-start-8" style={d(650)}>
              {meta.map((m) => (
                <div key={m.k} className="border-r border-graphite py-4 pr-3 last:border-r-0 [&:not(:first-child)]:pl-3">
                  <dt className="meta text-ash">{m.k}</dt>
                  <dd className="meta mt-2 text-white">{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="intro meta flex items-center justify-between border-t border-graphite py-4 text-ash" style={d(800)}>
          <a href="#about" className="inline-flex min-h-11 items-center gap-2 hover:text-white">
            <ArrowDown aria-hidden className="size-3" /> Scroll
          </a>
          <span className="tabular-nums">01 / 06</span>
        </div>
      </div>
    </section>
  );
}
