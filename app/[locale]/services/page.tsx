import type { Metadata } from "next";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import AboutEnvironment from "@/src/components/servicesSection/AboutEnvironment";
import AboutServices from "@/src/components/servicesSection/AboutServices";
import ServicesHero from "@/src/components/servicesSection/Hero";
import WhatWeBuild from "@/src/components/servicesSection/WhatWeBuild";

export const metadata: Metadata = {
  title: "Technology Services | Happy2Tech (H2Tech)",
  description:
    "Explore Happy2Tech technology services including custom software development, mobile apps, web platforms, cloud infrastructure, SEO, hosting, and digital design solutions.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Software Development and Technology Services",
            provider: {
              "@type": "Organization",
              name: "Happy2Tech",
              url: "https://happy2tech.fi",
            },
          }),
        }}
      />
      <Navbar />
      <main>
        <section id="services-about">
          <AboutServices />
        </section>
        <section id="services-what-we-build">
          <WhatWeBuild />
        </section>
        <section id="services-home">
          <ServicesHero />
        </section>
        <section id="services-environment">
          <AboutEnvironment />
        </section>
      </main>
      <Footer />
    </>
  );
}
