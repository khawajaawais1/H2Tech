"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { pad, useBlackWeekCountdown } from "./BlackWeekBanner";

/** Slim Black Week promo bar for pages outside the promotions page. */
const BlackWeekStrip = () => {
  const t = useTranslations("campaigns");
  const locale = useLocale();
  const timeLeft = useBlackWeekCountdown();

  if (timeLeft === null) return null;

  const countdown = timeLeft
    ? `${timeLeft.days}${t("blackWeek_daysShort")} ${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`
    : "--:--:--";

  return (
    <Link
      href={`/${locale}/promotions`}
      className="group relative block overflow-hidden bg-[#030620] text-white"
      aria-label={`${t("blackWeek_title")} — ${t("blackWeek_stripOffer")}`}
    >
      <style>{`
        @keyframes bwStripShine { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }
      `}</style>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 8% 50%, rgba(38,72,255,0.3) 0%, transparent 35%), radial-gradient(circle at 92% 50%, rgba(193,18,18,0.45) 0%, transparent 40%), linear-gradient(90deg, #030620 0%, #0B1245 50%, #030620 100%)",
        }}
      />
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{ animation: "bwStripShine 4.5s linear infinite" }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C11212] to-transparent" />

      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-4 py-2.5 text-center sm:gap-x-4">
        <span className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.16em] sm:text-[13px]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff3b3b]/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff3b3b]" />
          </span>
          {t("blackWeek_title")}
        </span>

        <span className="rounded-md bg-gradient-to-br from-[#E01B1B] to-[#8f0a0d] px-2 py-0.5 text-[12px] font-black sm:text-[13px]">
          -20%
        </span>

        <span className="text-[12.5px] font-semibold text-white/90 sm:text-[13.5px]">{t("blackWeek_stripOffer")}</span>

        <span className="hidden items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[12px] text-white/70 sm:inline-flex">
          {t("blackWeek_endsIn")}
          <span className="font-bold tabular-nums text-white">{countdown}</span>
        </span>

        <span className="inline-flex items-center gap-1 text-[12.5px] font-bold text-[#ff6b6b] transition group-hover:text-white sm:text-[13px]">
          {t("blackWeek_stripCta")}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.8} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default BlackWeekStrip;
