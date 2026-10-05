import { Mail } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/BrandIcons";
import { ActionLink } from "@/components/ActionLink";
import { CVButton } from "@/components/CVButton";
import { SectionHeader } from "@/components/SectionHeader";
import { LazyNodeSphere } from "@/components/visuals/LazyVisuals";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section id="contact" data-nav="contact" data-theme="dark" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-void pt-20 text-white md:pt-28">
      <div aria-hidden className="absolute -right-[20%] top-[8%] -z-10 aspect-square w-[110%] opacity-60 md:-right-[8%] md:w-[62%] lg:opacity-90">
        <LazyNodeSphere className="h-full w-full" />
      </div>
      <div className="shell">
        <SectionHeader index="06" label="Contact" aside={profile.locationShort} />
        <h2 id="contact-title" className="display reveal-lines mt-12 text-[clamp(2.6rem,8.5vw,8rem)] md:mt-16">
          <span className="line"><span>Let&apos;s build</span></span>
          <span className="line text-ash" style={{ ["--i" as string]: 1 }}><span>secure</span></span>
          <span className="line" style={{ ["--i" as string]: 2 }}><span>systems.</span></span>
        </h2>
        <p className="reveal mt-10 max-w-lg text-lg leading-relaxed text-fog" style={{ ["--d" as string]: "300ms" }}>
          Open to opportunities and conversations in cybersecurity, cloud infrastructure, DevOps and related engineering roles.
        </p>

        <div className="reveal mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" style={{ ["--d" as string]: "400ms" }}>
          {profile.email ? (
            <ActionLink href={`mailto:${profile.email}`} variant="primary" cursor="connect" icon={<Mail aria-hidden className="size-3.5" />}>
              Email me
            </ActionLink>
          ) : null}
          {profile.linkedin ? (
            <ActionLink href={profile.linkedin} cursor="connect" icon={<Linkedin aria-hidden className="size-3.5" />} arrow>
              LinkedIn
            </ActionLink>
          ) : null}
          {profile.github ? (
            <ActionLink href={profile.github} cursor="connect" icon={<Github aria-hidden className="size-3.5" />} arrow>
              GitHub
            </ActionLink>
          ) : null}
          <CVButton />
        </div>
        {profile.email ? (
          <p className="reveal meta mt-6 text-ash">
            Direct — <a href={`mailto:${profile.email}`} data-cursor="connect" className="normal-case tracking-normal text-fog underline decoration-graphite underline-offset-4 hover:text-white">{profile.email}</a>
          </p>
        ) : null}

        <footer className="mt-20 grid grid-cols-1 gap-8 border-t border-graphite py-8 md:mt-28 md:grid-cols-3 md:items-center">
          <div>
            <p className="meta text-white">{profile.name}</p>
            <p className="meta mt-1 text-ash">{profile.positioning}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1 md:justify-center">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="meta inline-flex min-h-11 items-center text-ash hover:text-white">{n.label}</a>
            ))}
          </nav>
          <p className="meta text-ash md:text-right">© {new Date().getFullYear()} — {profile.locationShort}</p>
        </footer>
      </div>
    </section>
  );
}
