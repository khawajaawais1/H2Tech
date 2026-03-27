import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const FutureSection = () => {
  const t = useTranslations("future");
  const locale = useLocale();

  return (
    <section id="future" className="relative w-full bg-white">
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[2.15rem] leading-tight font-extrabold tracking-tight text-[#0B1233] sm:text-[2.6rem] md:text-[3.1rem]">
            {t("heading")}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-[#222] sm:text-[1rem] md:text-[1.05rem]">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="rounded-lg inline-flex h-[46px] bg-[#A20508] hover:bg-[#8a0406] items-center justify-center px-7 text-[0.95rem] font-semibold text-white shadow-sm transition-colors duration-200 active:scale-95"
            
            >
              {t("cta")}
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <div className="mx-auto w-full">
            <div
              className="relative w-full overflow-hidden bg-white shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
              style={{ aspectRatio: "16 / 7" }}
            >
              <Image
                src="/Future.svg"
                alt={t("imageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 92vw, (max-width: 1200px) 86vw, 1200px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureSection;