import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import VisionHero from "@/src/components/vision/Hero";
import { ProjectsSection, TestimonialsSection } from "@/src/components/vision/testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section id="vision">
          <ProjectsSection />
        </section>
         <section id="vision">
          <VisionHero />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
