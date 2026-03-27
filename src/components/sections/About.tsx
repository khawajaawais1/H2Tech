import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

type Card = {
  img: string;
  alt: string;
  titleKey: string;
  bodyKey: string;
};

const cardKeys: Card[] = [
  { img: "/About 1.png", alt: "Technical Skill", titleKey: "card1Title", bodyKey: "card1Body" },
  { img: "/About 2.png", alt: "High Quality",    titleKey: "card2Title", bodyKey: "card2Body" },
  { img: "/About 3.png", alt: "Global Experience", titleKey: "card3Title", bodyKey: "card3Body" },
];

const About = () => {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <section id="about" className="bg-[#EDEDED] w-full">
      <div className="mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="pt-14 pb-10 md:pt-20 md:pb-14">
          <p className="text-xs sm:text-sm font-semibold text-[#A20508] tracking-wide mb-4">
            {t("badge")}
          </p>

          <h2 className="font-extrabold text-[#0D1235] leading-tight mb-6 text-3xl sm:text-4xl md:text-5xl max-w-full md:max-w-[58%]">
            {t("heading")}
          </h2>

          <p className="text-[#000000] leading-relaxed text-sm sm:text-base max-w-full md:max-w-[100%]">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pb-16 md:pb-20">
          {cardKeys.map((card) => (
            <div key={card.titleKey} className="flex flex-col">
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={card.img}
                  alt={t(card.titleKey)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="pt-6">
                <h3 className="font-bold text-[#0D1235] mb-3 text-xl sm:text-2xl">
                  {t(card.titleKey)}
                </h3>
                <p className="text-sm sm:text-base text-[#444455] leading-relaxed">
                  {t(card.bodyKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6 pb-16 md:pb-20">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-1.5 text-sm font-normal text-[#A20508] hover:text-[#A20508] transition-colors duration-200 group"
          >
            {t("cta")}
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;