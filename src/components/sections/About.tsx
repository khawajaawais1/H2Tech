"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

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
    <section id="about" className="relative w-full overflow-hidden bg-[#EDEDED]">
      <div
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#C11212]/8 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gray-400/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <motion.div
          className="pt-14 pb-10 md:pt-20 md:pb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#A20508]/15 bg-[#A20508]/5 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#A20508]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A20508]/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A20508]" />
            </span>
            {t("badge")}
          </span>

          <h2 className="font-extrabold text-[#0D1235] leading-tight mt-5 mb-6 text-3xl sm:text-4xl md:text-5xl max-w-full md:max-w-[58%]">
            {t("headingPre")}
            <span className="bg-gradient-to-r from-red-600 to-gray-500 bg-clip-text text-transparent">
              {t("headingHighlight")}
            </span>
          </h2>

          <p className="text-[#000000] leading-relaxed text-sm sm:text-base max-w-full md:max-w-[100%]">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 pb-16 md:pb-20">
          {cardKeys.map((card, index) => (
            <motion.div
              key={card.titleKey}
              className="h-full"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
            >
              <div className="group relative flex h-full flex-col rounded-[26px] border border-black/5 bg-white shadow-[0_10px_30px_rgba(5,10,48,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#C11212]/25 hover:shadow-[0_28px_60px_rgba(5,10,48,0.14)]">
                <div className="relative w-full overflow-hidden rounded-t-[26px]" style={{ aspectRatio: "16/10" }}>
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: index * 1.6 }}
                  >
                    <Image
                      src={card.img}
                      alt={t(card.titleKey)}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                </div>

                <div className="relative px-7">
                  <span className="absolute -top-6 left-0 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#C11212] to-red-500 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(193,18,18,0.4)] ring-4 ring-white transition-transform duration-300 group-hover:scale-110">
                    0{index + 1}
                  </span>
                </div>

                <div className="px-7 pb-8 pt-9">
                  <h3 className="font-bold text-[#0D1235] mb-3 text-xl sm:text-2xl">
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-sm sm:text-base text-[#444455] leading-relaxed">
                    {t(card.bodyKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex items-center gap-6 pb-16 md:pb-20"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link
            href={`/${locale}/services`}
            className="group relative inline-flex items-center gap-1.5 text-sm font-normal text-[#A20508] transition-colors duration-200"
          >
            {t("cta")}
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#A20508] transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
