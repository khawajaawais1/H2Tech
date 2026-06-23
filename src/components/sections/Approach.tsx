"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import type { MouseEvent } from "react";

const FLOAT_TRANSITION = (duration: number, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  ease: "easeInOut" as const,
});

const Approach = () => {
  const t = useTranslations("approach");
  const locale = useLocale();

  const collageRef = useRef<HTMLDivElement>(null);

  const mvX1 = useMotionValue(0);
  const mvY1 = useMotionValue(0);
  const mvX2 = useMotionValue(0);
  const mvY2 = useMotionValue(0);
  const mvX3 = useMotionValue(0);
  const mvY3 = useMotionValue(0);
  const springX1 = useSpring(mvX1, { stiffness: 120, damping: 14 });
  const springY1 = useSpring(mvY1, { stiffness: 120, damping: 14 });
  const springX2 = useSpring(mvX2, { stiffness: 120, damping: 14 });
  const springY2 = useSpring(mvY2, { stiffness: 120, damping: 14 });
  const springX3 = useSpring(mvX3, { stiffness: 120, damping: 14 });
  const springY3 = useSpring(mvY3, { stiffness: 120, damping: 14 });

  const applyRepel = (anchorX: number, anchorY: number, fx: number, fy: number, mx: typeof mvX1, my: typeof mvY1) => {
    const dx = anchorX - fx;
    const dy = anchorY - fy;
    const dist = Math.hypot(dx, dy) || 0.0001;
    const influence = 0.55;
    const falloff = Math.max(0, 1 - dist / influence);
    const push = falloff * 46;
    mx.set((dx / dist) * push);
    my.set((dy / dist) * push);
  };

  const handleCollageMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = collageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const fx = (e.clientX - rect.left) / rect.width;
    const fy = (e.clientY - rect.top) / rect.height;
    applyRepel(0.78, 0.82, fx, fy, mvX1, mvY1);
    applyRepel(0.22, 0.55, fx, fy, mvX2, mvY2);
    applyRepel(0.88, 0.18, fx, fy, mvX3, mvY3);
  };

  const handleCollageLeave = () => {
    [mvX1, mvY1, mvX2, mvY2, mvX3, mvY3].forEach((v) => v.set(0));
  };

  return (
    <section
      id="approach"
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #050A30 0%, #0B1030 35%, #2A3052 70%, #B8BAC6 100%)",
      }}
    >
      <style>{`
        @keyframes approachOrbDrift { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-26px,22px) scale(1.06); } }
      `}</style>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 85% 18%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 35%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-[-80px] h-72 w-72 rounded-full bg-[#C11212]/18 blur-[110px]"
        style={{ animation: "approachOrbDrift 13s ease-in-out infinite" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16">
          <motion.div
            className="flex-1 lg:max-w-[56%]"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C11212]/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C11212]" />
              </span>
              {t("badge")}
            </span>

            <h2 className="font-bold text-white leading-[1.08] mt-5 mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {t("headingPre")}
              <span className="bg-gradient-to-r from-[#FF6063] to-[#FFB199] bg-clip-text text-transparent">
                {t("headingHighlight")}
              </span>
            </h2>

            <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              {t("description")}
            </p>

            <div className="flex flex-row items-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="group relative inline-flex overflow-hidden rounded-lg items-center justify-center gap-2 bg-[#A20508] hover:bg-[#8a0406] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 active:scale-95"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative">{t("cta")}</span>
                <svg className="relative h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            {/* Mobile collage */}
            <div className="mt-10 lg:hidden">
              <div className="mx-auto w-full max-w-[340px]">
                <div className="relative h-[360px]">
                  <motion.div
                    className="absolute ml-5 w-[300px] h-[350px]"
                    animate={{ x: [0, 6, 0, -6, 0], y: [0, -10, -16, -10, 0] }}
                    transition={FLOAT_TRANSITION(8)}
                  >
                    <motion.div
                      className="relative w-full h-full overflow-hidden rounded-[20px] shadow-[0_26px_52px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
                      initial={{ opacity: 0, y: 30, rotate: -2 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                    >
                      <Image src="/Vision1.png" alt={t("img1Alt")} fill className="object-cover" sizes="340px" priority />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="absolute right-0 top-[36px] w-[165px] h-[130px]"
                    animate={{ x: [0, -6, 0, 6, 0], y: [0, 8, 14, 8, 0] }}
                    transition={FLOAT_TRANSITION(9, 0.4)}
                  >
                    <motion.div
                      className="relative w-full h-full overflow-hidden rounded-[20px] shadow-[0_26px_52px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
                      initial={{ opacity: 0, x: 24, rotate: 3 }}
                      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
                    >
                      <Image src="/Vision2.png" alt={t("img2Alt")} fill className="object-cover" sizes="340px" />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="absolute left-0 bottom-[34px] w-[240px] h-[135px]"
                    animate={{ x: [0, 8, 0, -8, 0], y: [0, -6, -12, -6, 0] }}
                    transition={FLOAT_TRANSITION(10, 0.8)}
                  >
                    <motion.div
                      className="relative w-full h-full overflow-hidden rounded-[20px] shadow-[0_26px_52px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
                      initial={{ opacity: 0, x: -24, rotate: -3 }}
                      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
                    >
                      <Image src="/Vision3.png" alt={t("img3Alt")} fill className="object-cover" sizes="340px" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Desktop collage — images float/orbit gently, and flee from the cursor */}
          <div className="hidden lg:block flex-1 w-full lg:max-w-[44%]">
            <div
              ref={collageRef}
              onMouseMove={handleCollageMove}
              onMouseLeave={handleCollageLeave}
              className="mx-auto w-full max-w-[520px]"
            >
              <div className="relative h-[520px] origin-top scale-100">
                {/* Image 1 */}
                <motion.div
                  className="absolute right-0 bottom-0 w-[430px] h-[560px]"
                  animate={{ x: [0, 10, 0, -10, 0], y: [0, -8, -14, -8, 0] }}
                  transition={FLOAT_TRANSITION(11)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50, rotate: -2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    whileHover={{ scale: 1.04, rotate: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative w-full h-full overflow-hidden rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
                  >
                    <motion.div className="relative w-full h-full" style={{ x: springX1, y: springY1 }}>
                      <Image src="/Vision1.png" alt={t("img1Alt")} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 430px" priority />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Image 2 */}
                <motion.div
                  className="absolute top-[298px] left-[-18px] w-[325px] h-[205px]"
                  animate={{ x: [0, -8, 0, 8, 0], y: [0, 6, 12, 6, 0] }}
                  transition={FLOAT_TRANSITION(9, 0.6)}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -50, rotate: -3 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    whileHover={{ scale: 1.05, rotate: -1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
                    className="relative w-full h-full overflow-hidden rounded-[20px] shadow-[0_26px_52px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
                  >
                    <motion.div className="relative w-full h-full" style={{ x: springX2, y: springY2 }}>
                      <Image src="/Vision3.png" alt={t("img3Alt")} fill className="object-cover" sizes="(max-width: 1024px) 80vw, 325px" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Image 3 */}
                <motion.div
                  className="absolute right-[-118px] top-[12px] w-[210px] h-[210px]"
                  animate={{ x: [0, 8, 0, -8, 0], y: [0, -6, -12, -6, 0] }}
                  transition={FLOAT_TRANSITION(10, 1.1)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -40, rotate: 4 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    whileHover={{ scale: 1.06, rotate: 2 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.32, ease: "easeOut" }}
                    className="relative w-full h-full overflow-hidden rounded-[20px] shadow-[0_26px_52px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
                  >
                    <motion.div className="relative w-full h-full" style={{ x: springX3, y: springY3 }}>
                      <Image src="/Vision2.png" alt={t("img2Alt")} fill className="object-cover" sizes="(max-width: 1024px) 60vw, 210px" />
                    </motion.div>
                  </motion.div>
                </motion.div>
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
