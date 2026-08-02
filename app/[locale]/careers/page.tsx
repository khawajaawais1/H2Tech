import type { Metadata } from "next";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import CareersHero from "@/src/components/careers/CareersHero";
import JobOpenings from "@/src/components/careers/JobOpenings";
import WhyJoinUs from "@/src/components/careers/WhyJoinUs";
import OpenApplicationCta from "@/src/components/careers/OpenApplicationCta";

export const metadata: Metadata = {
  title: "Careers | Happy2Tech (H2Tech)",
  description:
    "Join Happy2Tech. Explore open internships and roles in marketing, business development, and HR, or send an open application.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <CareersHero />
        <JobOpenings />
        <WhyJoinUs />
        <OpenApplicationCta />
      </main>
      <Footer />
    </>
  );
}
