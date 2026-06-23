import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import About from "@/src/components/sections/About";
import Approach from "@/src/components/sections/Approach";
import AiShowcase from "@/src/components/sections/AiShowcase";
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
        <About />
        <section id="ai">
          <AiShowcase />
        </section>
        <section id="vision">
          <Vision />
        </section>
        <Approach />
        <FutureSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
