"use client";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const VisionHero = () => {
  const t = useTranslations("visionHero");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-[#F3F3F3]">
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 m-20 md:pt-0 md:pb-0">
        <h3 className="text-black/80 font-medium tracking-tight leading-tight drop-shadow-lg text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
          {t("heading")}
        </h3>

        <p className="mt-6 mx-auto text-black leading-relaxed text-sm sm:text-base md:text-lg max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          
           <a href={`/${locale}/contact`}
            className="inline-flex items-center rounded-lg bg-[#A20508] hover:bg-[#8a0406] justify-center text-white px-8 py-3.5 text-sm font-semibold active:scale-95 transition-all duration-200 w-44 sm:w-auto"
          >
            {t("cta")}
          </a>
        </div>
      </div>

      <div className="mx-auto w-full">
        <div
          className="relative w-full overflow-hidden bg-white shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
          style={{ aspectRatio: "16 / 7" }}
        >
          <Image
            src="/step.svg"
            alt={t("imageAlt")}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 86vw, 1200px"
          />
        </div>
      </div>
    </section>
  );
};

export default VisionHero;