"use client";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const ServicesHero = () => {
    const t = useTranslations("servicesHero");
  const locale = useLocale();
  return (
    <section id="services-home" className="relative overflow-hidden bg-white">
      <div
        className="
        relative z-10
        flex flex-col items-center justify-center text-center px-5
        m-20
        md:pt-0 md:pb-0
      "
      >
        <h1
          className="
           bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent font-semibold tracking-tight leading-tight drop-shadow-lg
          text-xl
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
          xl:text-6xl
          max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl
        "
        >
          {t("heading")}
        </h1>

        <p
          className="
          mt-6 mx-auto text-[#0D1235] leading-relaxed
          text-sm
          sm:text-base
          md:text-lg
          max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl
        "
        >
          {t("description")}{" "}
        </p>

        <div className="mt-8 flex rounded flex-col sm:flex-row items-center gap-4 bg-[#C11212]">
          <a
             href={`/${locale}/contact`}
            className="inline-flex items-center justify-center text-white px-8 py-3.5 text-sm font-semibold active:scale-95 transition-all duration-200 w-44 sm:w-auto"
          >
            {t("cta")}
          </a>
        </div>
      </div>
      <div className="">
        <div className="mx-auto w-full ">
          <div
            className="relative w-full overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
            style={{ aspectRatio: "16 / 7" }}
          >
            <Image
              src="/services_hero.svg"
              alt="Future section preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 86vw, 1200px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
