import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const Approach = () => {
  const t = useTranslations("approach");
  const locale = useLocale();

  return (
    <section
      id="approach"
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #050A30 0%, #0B1030 35%, #2A3052 70%, #B8BAC6 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 85% 18%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 35%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16">
          <div className="flex-1 lg:max-w-[56%]">
            <p className="text-sm font-medium text-white/80 tracking-wide mb-4">
              {t("badge")}
            </p>

            <h2 className="font-bold text-white leading-[1.08] mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {t("heading")}
            </h2>

            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              {t("description")}
            </p>

            <div className="flex flex-row items-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex rounded-lg items-center justify-center bg-[#A20508] hover:bg-[#8a0406] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200  active:scale-95"
              >
                {t("cta")}
              </Link>
            </div>

            {/* Mobile collage */}
            <div className="mt-10 lg:hidden">
              <div className="mx-auto w-full max-w-[340px]">
                <div className="relative h-[360px]">
                  <div className="absolute ml-5 w-[300px] h-[350px] shadow-[0_26px_52px_rgba(0,0,0,0.35)]">
                    <div className="relative w-full h-full">
                      <Image src="/Vision1.png" alt={t("img1Alt")} fill className="object-cover" sizes="340px" priority />
                    </div>
                  </div>
                  <div className="absolute right-0 top-[36px] w-[165px] h-[130px] shadow-[0_26px_52px_rgba(0,0,0,0.35)]">
                    <div className="relative w-full h-full">
                      <Image src="/Vision2.png" alt={t("img2Alt")} fill className="object-cover" sizes="340px" />
                    </div>
                  </div>
                  <div className="absolute left-0 bottom-[34px] w-[240px] h-[135px] shadow-[0_26px_52px_rgba(0,0,0,0.35)]">
                    <div className="relative w-full h-full">
                      <Image src="/Vision3.png" alt={t("img3Alt")} fill className="object-cover" sizes="340px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop collage */}
          <div className="hidden lg:block flex-1 w-full lg:max-w-[44%]">
            <div className="mx-auto w-full max-w-[520px]">
              <div className="relative h-[520px] origin-top scale-100">
                <div className="absolute right-0 bottom-0 w-[430px] h-[560px] shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
                  <div className="relative w-full h-full">
                    <Image src="/Vision1.png" alt={t("img1Alt")} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 430px" priority />
                  </div>
                </div>
                <div className="absolute top-[280px] left-0 w-[325px] h-[205px] shadow-[0_26px_52px_rgba(0,0,0,0.35)]">
                  <div className="relative w-full h-full">
                    <Image src="/Vision3.png" alt={t("img3Alt")} fill className="object-cover" sizes="(max-width: 1024px) 80vw, 325px" />
                  </div>
                </div>
                <div className="absolute right-[-100px] top-[28px] w-[210px] h-[210px] shadow-[0_26px_52px_rgba(0,0,0,0.35)]">
                  <div className="relative w-full h-full">
                    <Image src="/Vision2.png" alt={t("img2Alt")} fill className="object-cover" sizes="(max-width: 1024px) 60vw, 210px" />
                  </div>
                </div>
              </div>
              <div className="h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;