"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";

const FutureSection = () => {
  const t = useTranslations("future");
  const locale = useLocale();

  return (
    <section id="future" className="relative w-full overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 rounded-full bg-gradient-to-r from-red-600/8 to-gray-400/8 blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-20">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-[2.15rem] leading-tight font-extrabold tracking-tight text-[#0B1233] sm:text-[2.6rem] md:text-[3.1rem]">
            <span className="bg-gradient-to-r from-red-600 to-gray-500 bg-clip-text text-transparent">
              {t("headingHighlight")}
            </span>
            {t("headingPost")}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-[#222] sm:text-[1rem] md:text-[1.05rem]">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="group relative inline-flex h-[46px] items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#A20508] px-7 text-[0.95rem] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#8a0406] active:scale-95"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative">{t("cta")}</span>
              <svg className="relative h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative mx-auto w-full">
            <div
              className="absolute -inset-5 -z-10 rounded-[44px] bg-gradient-to-br from-red-600/12 via-transparent to-gray-400/14 blur-2xl"
              aria-hidden="true"
            />
            <motion.div
              className="relative w-full overflow-hidden rounded-[32px] bg-white shadow-[0_30px_70px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
              style={{ aspectRatio: "16 / 7" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/Future.svg"
                alt={t("imageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 92vw, (max-width: 1200px) 86vw, 1200px"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureSection;
