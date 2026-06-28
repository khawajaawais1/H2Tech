"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const WHATSAPP_HREF =
  "https://wa.me/358407078000?text=" +
  encodeURIComponent("Hi! I'd like to book a free call to discuss a promotion package.");

const CampaignFinalCta = () => {
  const t = useTranslations("campaigns");
  const locale = useLocale();

  return (
    <section className="bg-white px-5 py-10 sm:px-8 sm:py-12">
      <style>{`
        @keyframes campaignOrbFloat { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-14px,14px); } }
      `}</style>
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#050A30] via-[#0B1454] to-[#1A2670] px-7 py-12 sm:px-12 sm:py-16">
        <span
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#C11212]/25 blur-[100px]"
          style={{ animation: "campaignOrbFloat 9s ease-in-out infinite" }}
        />
        <span
          className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/5 blur-[90px]"
          style={{ animation: "campaignOrbFloat 12s ease-in-out infinite reverse" }}
        />

        <div className="relative max-w-2xl">
          <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
            {t("final_heading")}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/70 sm:text-base">{t("final_description")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C11212] px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-red-600 hover:shadow-[0_16px_36px_rgba(193,18,18,0.4)] active:scale-95"
            >
              {t("final_cta1")}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-95"
            >
              {t("final_cta2")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignFinalCta;
