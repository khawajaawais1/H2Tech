"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const visionKeys = ["vision1", "vision2", "vision3"];

const icons = [
  <svg key="compass" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[18px] w-[18px]">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 9.5 12.8 14l-4.3 1.5L10.2 11l4.3-1.5Z" />
  </svg>,
  <svg key="chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[18px] w-[18px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>,
  <svg key="growth" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[18px] w-[18px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18M7 17V10m5 7V4m5 13v-6" />
  </svg>,
];

const Vision = () => {
  const t = useTranslations("vision");
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.4"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative w-full overflow-hidden bg-[#F7F8FB]">
      <div
        className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-[#C11212]/8 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#1A2670]/8 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5,10,48,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(5,10,48,.04) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-24 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            className="order-1"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative mx-auto w-full max-w-[560px]">
              <div
                className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-[#C11212]/15 via-transparent to-[#1A2670]/20 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative aspect-square w-full overflow-hidden rounded-[32px] shadow-[0_30px_70px_rgba(5,10,48,0.18)] ring-1 ring-black/5">
                <Image
                  src="/5.png"
                  alt={t("imageAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <div className="order-2 w-full">
            <div ref={trackRef} className="relative flex flex-col gap-10 sm:gap-12 lg:gap-14">
              <div
                className="absolute left-5 top-1 bottom-1 w-[2px] -translate-x-1/2 rounded-full bg-black/10"
                aria-hidden="true"
              />
              <motion.div
                className="absolute left-5 top-1 bottom-1 w-[2px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-[#C11212] to-[#1A2670]"
                style={{ scaleY: lineProgress }}
                aria-hidden="true"
              />

              {visionKeys.map((key, index) => (
                <motion.div
                  key={key}
                  className="relative z-10 flex gap-5 sm:gap-6"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#C11212] shadow-[0_8px_20px_rgba(5,10,48,0.08)] transition-transform duration-300 hover:scale-110 hover:text-white hover:bg-[#C11212]">
                    {icons[index]}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-[1.7rem] font-extrabold leading-[1.14] tracking-[-0.03em] text-black sm:text-[1.95rem] lg:text-[2.15rem]">
                      {t(`${key}Title`)}
                    </h3>
                    <p className="mt-3 max-w-[95%] text-[1rem] leading-[1.6] text-black/70 sm:text-[1.02rem] lg:max-w-[92%]">
                      {t(`${key}Body`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
