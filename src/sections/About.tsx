import { SectionHeader } from "@/components/SectionHeader";
import { LayerStack } from "@/components/visuals/LayerStack";
import { profile } from "@/data/profile";

export function About() {
  const facts = [
    { k: "Location", v: profile.location },
    { k: "Education", v: profile.degree },
    { k: "University", v: profile.university },
    { k: "Status", v: profile.status },
    { k: "Focus", v: profile.positioning },
    { k: "Graduation", v: profile.graduation },
  ];
  return (
    <section id="about" data-nav="about" data-theme="light" aria-labelledby="about-title" className="relative bg-paper py-24 text-black md:py-28">
      <div className="shell">
        <SectionHeader index="02" label="Identity" tone="light" aside="About" />

        <div className="mt-14 grid grid-cols-1 gap-14 md:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 id="about-title" className="display reveal-lines text-[clamp(1.9rem,7.4vw,6.75rem)] lg:text-[clamp(3rem,5.1vw,5.75rem)] leading-[0.9]">
              <span className="line" style={{ ["--i" as string]: 0 }}><span>I build systems</span></span>
              <span className="line text-muted-light" style={{ ["--i" as string]: 1 }}><span>where security</span></span>
              <span className="line text-muted-light" style={{ ["--i" as string]: 2 }}><span>meets</span></span>
              <span className="line" style={{ ["--i" as string]: 3 }}><span>infrastructure.</span></span>
            </h2>
            <p className="reveal mt-12 max-w-xl text-lg leading-relaxed text-graphite md:text-xl" style={{ ["--d" as string]: "200ms" }}>
              I am {profile.name}, a final-semester {profile.degree} student at {profile.university}. My technical interests
              include cybersecurity, cloud infrastructure, networking, Linux and automation, with a focus on building practical
              technical projects and developing deeper expertise in secure systems.
            </p>
          </div>

          <div className="reveal flex items-center lg:col-span-5" style={{ ["--d" as string]: "250ms" }}>
            <LayerStack className="mx-auto h-auto w-full max-w-[460px]" />
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 border-l border-t border-line-light md:mt-16 lg:grid-cols-6">
          {facts.map((f, i) => (
            <div key={f.k} className="reveal border-b border-r border-line-light p-4 md:p-6" style={{ ["--d" as string]: `${i * 60}ms` }}>
              <dt className="meta text-muted-light">{f.k}</dt>
              <dd className="mt-3 text-[15px] font-medium leading-snug md:text-base">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
