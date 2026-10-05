import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { journey } from "@/data/journey";
import { cn } from "@/lib/cn";

export function Journey() {
  return (
    <section id="experience" data-nav="experience" data-theme="light" aria-labelledby="journey-title" className="bg-paper pb-12 pt-24 text-black md:pt-36">
      <div className="shell">
        <SectionHeader index="04" label="Journey" tone="light" aside="Experience" />
        <h2 id="journey-title" className="display reveal-lines mt-14 text-[clamp(3rem,9vw,8.5rem)] md:mt-20">
          <span className="line"><span>Journey</span></span>
        </h2>

        <div className="relative mt-16 md:mt-24">
          <span aria-hidden className="reveal-rule absolute bottom-0 left-[5px] top-0 w-px bg-black/25 lg:left-[calc(25%-0.5px)]" />
          {journey.map((track) => (
            <div key={track.code} className="grid grid-cols-1 gap-6 pb-16 lg:grid-cols-4 lg:gap-10">
              <div className="pl-8 lg:pl-0">
                <div className="lg:sticky lg:top-24">
                  <p className={cn("meta", track.weight === "primary" ? "text-black" : "text-muted-light")}>
                    {track.code} — {track.title}
                  </p>
                  <p className="meta mt-2 text-muted-light">{String(track.entries.length).padStart(2, "0")} entries</p>
                </div>
              </div>
              <ol className="lg:col-span-3">
                {track.entries.map((e, i) => {
                  const primary = track.weight === "primary";
                  const Title = e.href ? "a" : "span";
                  return (
                    <li key={e.title} className="reveal relative border-t border-line-light py-6 pl-8 lg:pl-10" style={{ ["--d" as string]: `${i * 70}ms` }}>
                      <span aria-hidden className={cn("absolute left-0 top-8 size-[11px] border border-black lg:-left-[5.5px]", primary ? "bg-black" : "bg-paper")} />
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-6">
                        <p className="meta text-muted-light md:col-span-3">
                          {e.period ?? "—"}
                          {e.status ? <span className="mt-1 block text-black/70">{e.status}</span> : null}
                        </p>
                        <div className="md:col-span-9">
                          <h3 className={cn("font-semibold uppercase tracking-[-0.02em]", primary ? "text-[clamp(1.25rem,2.4vw,1.9rem)] leading-tight" : "text-lg leading-snug text-black/80")}>
                            <Title {...(e.href ? { href: e.href, className: "inline-flex items-start gap-2 hover:underline underline-offset-4" } : {})}>
                              {e.title}
                              {e.href ? <ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0" /> : null}
                            </Title>
                          </h3>
                          {e.org ? <p className="meta mt-2 text-muted-light">{e.org}</p> : null}
                          <p className={cn("mt-3 max-w-2xl leading-relaxed text-graphite", primary ? "text-base md:text-[17px]" : "text-[15px]")}>{e.description}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
