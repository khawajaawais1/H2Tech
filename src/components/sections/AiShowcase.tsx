"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { TypeAnimation } from "react-type-animation";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const initParticles = async (engine: Engine) => {
  await loadSlim(engine);
};

const capabilityKeys = ["cap1", "cap2", "cap3", "cap4", "cap5", "cap6"];
const statKeys = ["stat1", "stat2", "stat3"];

const AiShowcase = () => {
  const t = useTranslations("aiShowcase");
  const locale = useLocale();

  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useSpring(useTransform(cardY, [-0.5, 0.5], [9, -9]), { stiffness: 150, damping: 16 });
  const rotateY = useSpring(useTransform(cardX, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 16 });

  const handleCardMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cardX.set((e.clientX - rect.left) / rect.width - 0.5);
    cardY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleCardLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  const particlesOptions = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: { value: 55, density: { enable: true, width: 900, height: 900 } },
        color: { value: ["#FF6063", "#7C8FFF", "#ffffff"] },
        links: { enable: true, color: "#3b4a8f", distance: 130, opacity: 0.35, width: 1 },
        move: { enable: true, speed: 0.6, outModes: { default: "out" } },
        size: { value: { min: 1, max: 2.4 } },
        opacity: { value: 0.55 },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: "grab" }, resize: { enable: true } },
        modes: { grab: { distance: 160, links: { opacity: 0.6 } } },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#050A30] via-[#0B1454] to-[#1A2670] py-20 sm:py-28">
      <div className="absolute inset-0">
        <ParticlesProvider init={initParticles}>
          <Particles id="ai-network" className="absolute inset-0" options={particlesOptions} />
        </ParticlesProvider>
      </div>
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#C11212]/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#3b4aff]/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-white/85">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6063]/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF6063]" />
              </span>
              {t("eyebrow")}
            </span>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-[42px]">
              {t("headingPre")}
              <span className="bg-gradient-to-r from-[#FF6063] to-[#FFB199] bg-clip-text text-transparent">
                {t("headingHighlight")}
              </span>
              {t("headingPost")}
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base">
              {t("description")}
            </p>

            <div className="mt-9 grid grid-cols-3 gap-4 sm:max-w-md">
              {statKeys.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="text-2xl font-extrabold text-white sm:text-[28px]">{t(`${key}Value`)}</div>
                  <div className="mt-1 text-[11.5px] leading-snug text-white/55">{t(`${key}Label`)}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {capabilityKeys.map((key, i) => (
                <motion.span
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.4)", backgroundColor: "rgba(255,255,255,0.1)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[12px] font-medium text-white/80"
                >
                  {t(key)}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Link
                href={`/${locale}/promotions`}
                className="group relative mt-10 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#C11212] to-red-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_34px_rgba(193,18,18,0.35)] transition-all duration-200 hover:shadow-[0_18px_42px_rgba(193,18,18,0.5)] active:scale-95"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative">{t("cta")}</span>
                <svg className="relative h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column - AI chat mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
            style={{ rotateX, rotateY, transformPerspective: 900 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5 shadow-[0_30px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[12.5px] font-semibold text-white/80">{t("chatBadge")}</span>
              </div>

              <div className="mt-5 flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-[#C11212] px-4 py-2.5 text-[13.5px] leading-relaxed text-white">
                  {t("userLine")}
                </div>
              </div>

              <div className="mt-3 flex justify-start">
                <div className="relative max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 text-[13.5px] leading-relaxed text-white/90">
                  {/* Invisible placeholder reserves the final two-line height/width so the
                      typing animation never resizes the bubble (was causing layout shift on mobile) */}
                  <span
                    className="invisible block px-4 py-3"
                    style={{ whiteSpace: "pre-line" }}
                    aria-hidden="true"
                  >
                    {`${t("aiLine1")}\n\n${t("aiLine2")}`}
                  </span>
                  <TypeAnimation
                    sequence={[t("aiLine1"), 900, `${t("aiLine1")}\n\n${t("aiLine2")}`, 4500]}
                    wrapper="span"
                    speed={70}
                    style={{ whiteSpace: "pre-line" }}
                    className="absolute inset-0 px-4 py-3"
                    repeat={Infinity}
                    cursor
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AiShowcase;
