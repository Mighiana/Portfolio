import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { RevealObserver } from "@/components/RevealObserver";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Education } from "@/sections/Education";
import { Hero } from "@/sections/Hero";
import { Journey } from "@/sections/Journey";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { ThesisCaseStudy } from "@/sections/ThesisCaseStudy";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link meta">Skip to content</a>
      <Preloader />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <ThesisCaseStudy />
        <Journey />
        <Education />
        <Skills />
        <Contact />
      </main>
      <RevealObserver />
      <CustomCursor />
    </>
  );
}
