import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { RevealObserver } from "@/components/RevealObserver";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Education } from "@/sections/Education";
import { Hero } from "@/sections/Hero";
import { Journey } from "@/sections/Journey";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Currently } from "@/sections/Currently";
import { Certifications, InternationalPrograms } from "@/sections/AcademicPrograms";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link meta">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Currently />
        <Projects />
        <Journey />
        <InternationalPrograms />
        <Education />
        <Certifications />
        <Skills />
        <Contact />
      </main>
      <RevealObserver />
      <CustomCursor />
    </>
  );
}
