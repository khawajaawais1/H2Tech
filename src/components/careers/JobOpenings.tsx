"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { jobOpenings } from "@/src/data/careers";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} className="h-4 w-4 shrink-0 text-[#C11212]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 6" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-3.5 w-3.5 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 11.5L12 4l8 7.5M6 10v9h12v-9" />
  </svg>
);

const GradCapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-3.5 w-3.5 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 8l10-5 10 5-10 5-10-5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
  </svg>
);

const WalletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-3.5 w-3.5 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12h5a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5a2 2 0 0 1 0-4z" />
  </svg>
);

const JobOpenings = () => {
  const t = useTranslations("careers");
  const locale = useLocale();

  return (
    <section id="openings" className="bg-[#F7F8FB] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C11212]/20 bg-[#FDECEC] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#C11212]">
            {t("openingsBadge")}
          </span>
          <h2 className="mt-4 text-2xl font-extrabold text-[#0D1235] sm:text-3xl">{t("openingsHeading")}</h2>
          <p className="mt-2 text-sm text-black/55 sm:text-base">{t("openingsSub")}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobOpenings.map((job) => {
            const title = t(`${job.id}_title`);
            const contactMessage = [
              t("applyIntro", { title }),
              "",
              t(`${job.id}_description`),
              "",
              t("applyOutro"),
            ].join("\n");
            const contactHref = `/${locale}/contact?topic=${encodeURIComponent("Careers")}&message=${encodeURIComponent(contactMessage)}`;

            return (
              <div
                key={job.id}
                className="group flex h-full flex-col rounded-[22px] border border-black/10 bg-white p-6 shadow-[0_4px_18px_rgba(5,10,48,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(5,10,48,0.1)]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#C11212]">
                    {t("tagInternship")}
                  </span>
                  <span className="rounded-full border border-amber-300/60 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                    {t("tagFulltime")}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-extrabold text-[#0D1235]">{title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-black/55">{t(`${job.id}_description`)}</p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-[#F7F8FB] px-2.5 py-1 text-[11px] font-semibold text-[#0D1235]/70">
                    <HomeIcon />
                    {t("tagLocation")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-[#F7F8FB] px-2.5 py-1 text-[11px] font-semibold text-[#0D1235]/70">
                    <GradCapIcon />
                    {t("tagStudent")}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-amber-700">
                  <WalletIcon />
                  {t("tagUnpaid")}
                </div>

                <div className="my-4 h-px bg-black/8" />

                <div className="flex-1 space-y-2.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3 text-[13.5px] leading-snug text-[#0D1235]/85">
                      <CheckIcon />
                      <span>{t(`${job.id}_bullet${i}`)}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={contactHref}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#050A30] px-5 py-3.5 text-center text-[14px] font-bold text-white transition-all duration-200 hover:bg-[#0B1454] active:scale-95"
                >
                  {t("apply")}
                  <ArrowIcon />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobOpenings;
