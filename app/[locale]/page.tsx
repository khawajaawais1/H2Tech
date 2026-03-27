import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import About from "@/src/components/sections/About";
import Approach from "@/src/components/sections/Approach";
import FaqSection from "@/src/components/sections/Faqs";
import FutureSection from "@/src/components/sections/Future";
import Hero from "@/src/components/sections/Hero";
import Vision from "@/src/components/sections/Vision";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Happy2Tech",
            url: "https://happy2tech.fi",
            logo: "https://happy2tech.fi/logo.png",
          }),
        }}
      />
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="vision">
          <Vision />
        </section>
        <section id="approach">
          <Approach />
        </section>
        <section id="future">
          <FutureSection />
        </section>
        <section id="faqs">
          <FaqSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
