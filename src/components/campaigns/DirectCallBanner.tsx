"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

const PHONE_DISPLAY = "+358 40 707 8000";
const WHATSAPP_HREF =
  "https://wa.me/358407078000?text=" +
  encodeURIComponent("Hi! I have a quick question about your promotion packages.");

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.51 3.62 1.4 5.12L2 22l5.13-1.48a9.86 9.86 0 0 0 4.91 1.31h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.78 14.07c-.24.68-1.41 1.31-1.94 1.36-.5.05-.96.24-3.24-.68-2.74-1.1-4.5-3.9-4.64-4.08-.13-.18-1.1-1.46-1.1-2.79 0-1.32.7-1.97.94-2.24.24-.26.53-.33.7-.33.18 0 .35 0 .5.01.16.01.38-.06.6.46.24.57.81 1.98.88 2.13.07.14.12.31.02.5-.42.85-.86.82-.48 1.46.81 1.36 1.65 1.97 2.95 2.6.22.1.35.09.49-.04.18-.18.71-.78.9-1.05.19-.27.38-.22.63-.13.26.09 1.63.81 1.91.96.28.14.46.21.53.33.07.13.07.71-.17 1.39Z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-6 w-6">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
    />
  </svg>
);

const DirectCallBanner = () => {
  const t = useTranslations("campaigns");

  return (
    <section className="bg-[#F7F8FB] px-5 pb-16 sm:px-8 md:pb-20">
      <style>{`
        @keyframes directCallGlow { 0%,100% { opacity:.5; transform: scale(1); } 50% { opacity:.85; transform: scale(1.08); } }
      `}</style>
      <div className="mx-auto max-w-6xl">
        <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#050A30] via-[#0B1454] to-[#1A2670] p-7 shadow-[0_18px_45px_rgba(5,10,48,0.18)] sm:flex-row sm:justify-between sm:p-9">
          <span
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#C11212]/35 blur-3xl"
            style={{ animation: "directCallGlow 5s ease-in-out infinite" }}
          />

          <div className="relative flex items-center gap-4 text-center sm:text-left">
            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#FF6063] sm:flex">
              <PhoneIcon />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white sm:text-xl">{t("directCall_heading")}</h3>
              <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-white/65">
                {t("directCall_description")}
              </p>
              <p className="mt-2 text-[13px] font-semibold text-white/80">
                {t("directCall_phoneLabel")}{" "}
                <a href="tel:+358407078000" className="text-[#FF6063] underline-offset-2 hover:underline">
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </div>

          <Link
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_32px_rgba(37,211,102,0.35)] transition-all duration-200 hover:shadow-[0_18px_40px_rgba(37,211,102,0.5)] active:scale-95"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <WhatsAppIcon />
            <span className="relative">{t("directCall_cta")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DirectCallBanner;
