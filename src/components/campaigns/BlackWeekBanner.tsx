"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

/** Offer ends at the end of 30 November, Finnish time (EET, UTC+2). */
export const BLACK_WEEK_ENDS = new Date("2026-11-30T23:59:59+02:00").getTime();

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

const getTimeLeft = (): TimeLeft | null => {
  const diff = BLACK_WEEK_ENDS - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n: number) => String(n).padStart(2, "0");

const BlackWeekBanner = () => {
  const t = useTranslations("campaigns");
  const locale = useLocale();
  // undefined = not mounted yet (avoids a server/client clock mismatch), null = offer ended.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft());
    const first = setTimeout(tick, 0);
    const timer = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, []);

  if (timeLeft === null) return null;

  const units: { key: keyof TimeLeft; label: string }[] = [
    { key: "days", label: t("blackWeek_days") },
    { key: "hours", label: t("blackWeek_hours") },
    { key: "minutes", label: t("blackWeek_minutes") },
    { key: "seconds", label: t("blackWeek_seconds") },
  ];

  const contactHref = `/${locale}/contact?topic=${encodeURIComponent("Project Request")}&message=${encodeURIComponent(t("blackWeek_contactMessage"))}`;

  return (
    <section
      aria-label={t("blackWeek_title")}
      className="relative overflow-hidden bg-[#030620] px-5 py-10 text-white sm:px-8 sm:py-12 md:py-14"
    >
      <style>{`
        @keyframes bwShine { 0% { transform: translateX(-120%) skewX(-20deg); } 60%, 100% { transform: translateX(320%) skewX(-20deg); } }
        @keyframes bwPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(193,18,18,.55); } 50% { box-shadow: 0 0 0 12px rgba(193,18,18,0); } }
        @keyframes bwFloat { 0%, 100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-10px) rotate(-5deg); } }
        @keyframes bwTick { from { transform: translateY(-30%); opacity: .2; } to { transform: none; opacity: 1; } }
        @keyframes bwIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        .bw-in { animation: bwIn .7s ease-out both; }
        .bw-tick { animation: bwTick .35s ease-out; }
      `}</style>

      {/* Backdrop: brand glows, diagonal stripes and a giant faded "-20%" */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 20%, rgba(38,72,255,0.28) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(193,18,18,0.45) 0%, transparent 48%), linear-gradient(135deg, #030620 0%, #050A30 45%, #0B1245 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "repeating-linear-gradient(-45deg, #fff 0 2px, transparent 2px 22px)" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none text-[220px] font-black leading-none tracking-tighter text-white/[0.04] lg:block xl:text-[280px]"
      >
        -20%
      </span>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C11212] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C11212] to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        {/* Offer */}
        <div className="bw-in text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/85 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff3b3b]/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff3b3b]" />
            </span>
            {t("blackWeek_eyebrow")}
          </span>

          <h2 className="mt-5 flex flex-wrap items-end justify-center gap-x-4 gap-y-1 lg:justify-start">
            <span className="text-[2.6rem] font-black uppercase leading-none tracking-tight sm:text-6xl">
              {t("blackWeek_title")}
            </span>
            <span
              className="relative inline-flex items-center overflow-hidden rounded-xl bg-gradient-to-br from-[#E01B1B] to-[#8f0a0d] px-4 py-1.5 text-3xl font-black leading-none shadow-[0_12px_30px_-8px_rgba(193,18,18,0.8)] sm:text-5xl"
              style={{ animation: "bwFloat 4s ease-in-out infinite" }}
            >
              -20%
              <span
                className="absolute inset-y-0 left-0 w-1/3 bg-white/35"
                style={{ animation: "bwShine 3.2s ease-in-out infinite" }}
              />
            </span>
          </h2>

          <p className="mt-4 text-lg font-bold sm:text-2xl">
            {t("blackWeek_offerPre")}{" "}
            <span className="bg-gradient-to-r from-[#ff4d4d] to-[#ffb4b4] bg-clip-text text-transparent">
              {t("blackWeek_offerHighlight")}
            </span>
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base lg:mx-0">
            {t("blackWeek_description")}
          </p>
        </div>

        {/* Countdown + CTA */}
        <div className="bw-in rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:p-6" style={{ animationDelay: ".15s" }}>
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
            {t("blackWeek_endsIn")}
          </p>

          <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-live="off">
            {units.map(({ key, label }, i) => (
              <div key={key} className="relative">
                <div className="flex aspect-square flex-col items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-[#121a4d] to-[#070c2c] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <span
                    key={timeLeft ? timeLeft[key] : "x"}
                    className={`text-2xl font-black tabular-nums leading-none sm:text-4xl ${key === "seconds" ? "bw-tick text-[#ff4d4d]" : ""}`}
                  >
                    {timeLeft ? pad(timeLeft[key]) : "--"}
                  </span>
                  <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/50 sm:text-[10px]">
                    {label}
                  </span>
                </div>
                {i < units.length - 1 && (
                  <span className="absolute -right-[7px] top-1/2 hidden -translate-y-1/2 text-lg font-black text-white/25 sm:block">:</span>
                )}
              </div>
            ))}
          </div>

          <Link
            href={contactHref}
            className="group mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C11212] to-[#E01B1B] text-sm font-bold text-white transition hover:brightness-110"
            style={{ animation: "bwPulse 2.4s ease-in-out infinite" }}
          >
            {t("blackWeek_cta")}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} className="h-4 w-4 transition-transform group-hover:translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          <p className="mt-3 text-center text-xs text-white/55">{t("blackWeek_validUntil")}</p>
        </div>
      </div>
    </section>
  );
};

export default BlackWeekBanner;
