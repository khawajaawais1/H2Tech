"use client";
import { useTranslations } from "next-intl";

const textIn = (delay: number) => ({ animation: `careersTextIn 0.7s ease-out ${delay}s both` });

const CareersHero = () => {
  const t = useTranslations("careers");

  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-14 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20">
      <style>{`
        @keyframes careersTextIn { from { opacity:0; transform: translateY(26px); } to { opacity:1; transform:none; } }
        @keyframes careersBlobDrift { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-24px) scale(1.08); } }
      `}</style>

      <div
        className="pointer-events-none absolute -top-32 left-[20%] h-[420px] w-[420px] rounded-full bg-[#C11212]/10 blur-[110px]"
        style={{ animation: "careersBlobDrift 16s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute -top-16 right-[5%] h-[380px] w-[380px] rounded-full bg-[#050A30]/10 blur-[110px]"
        style={{ animation: "careersBlobDrift 20s ease-in-out infinite reverse" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5,10,48,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(5,10,48,.05) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span
          style={textIn(0)}
          className="inline-flex items-center gap-2 rounded-full border border-[#C11212]/20 bg-[#FDECEC] px-4 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-[#C11212]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C11212]/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C11212]" />
          </span>
          {t("hero_eyebrow")}
        </span>

        <h1
          style={textIn(0.12)}
          className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0D1235] sm:text-5xl md:text-6xl"
        >
          {t("hero_headingPre")}
          <span className="bg-gradient-to-r from-red-600 to-gray-500 bg-clip-text text-transparent">
            {t("hero_headingHighlight")}
          </span>
        </h1>

        <p style={textIn(0.24)} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black/65 sm:text-lg">
          {t("hero_description")}
        </p>

        <div style={textIn(0.36)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[t("hero_pill1"), t("hero_pill2"), t("hero_pill3")].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-semibold text-[#0D1235] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-3.5 w-3.5 text-[#C11212]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 6" />
              </svg>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
