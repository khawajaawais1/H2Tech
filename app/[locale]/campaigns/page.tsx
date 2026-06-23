import type { Metadata } from "next";
import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import CampaignHero from "@/src/components/campaigns/Hero";
import PricingExplorer from "@/src/components/campaigns/PricingExplorer";
import DirectCallBanner from "@/src/components/campaigns/DirectCallBanner";
import TrustStrip from "@/src/components/campaigns/TrustStrip";
import CampaignFinalCta from "@/src/components/campaigns/FinalCta";

export const metadata: Metadata = {
  title: "Campaigns & Pricing | Happy2Tech (H2Tech)",
  description:
    "Launch-ready campaign pricing for websites, mobile apps, web apps, and AI chatbots. Transparent starting prices, tailored quotes in 24 hours, built for the Finnish market.",
  alternates: {
    canonical: "/campaigns",
  },
};

export default function CampaignsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "Happy2Tech Campaign Pricing",
            url: "https://happy2tech.fi/campaigns",
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
        <CampaignHero />
        <PricingExplorer />
        <DirectCallBanner />
        <TrustStrip />
        <CampaignFinalCta />
      </main>
      <Footer />
    </>
  );
}
