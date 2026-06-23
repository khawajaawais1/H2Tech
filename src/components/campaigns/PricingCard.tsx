"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { PricingTier } from "@/src/data/campaigns";
import CountUp from "./CountUp";

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.6}
    className="h-4 w-4 shrink-0 text-[#C11212]"
  >
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

const FlowArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-3 w-3 shrink-0 text-[#C11212]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const PricingCard = ({
  categoryId,
  tier,
  delay,
}: {
  categoryId: string;
  tier: PricingTier;
  delay: number;
}) => {
  const t = useTranslations("campaigns");
  const locale = useLocale();
  const prefix = `${categoryId}_${tier.id}`;
  const priceValue = tier.priceFrom ? Number(tier.priceFrom.replace(/[^\d]/g, "")) : 0;

  const content = (
    <div className="group relative flex h-full flex-col rounded-[26px] bg-white p-7 sm:p-8">
      <span className="absolute left-7 right-7 top-0 h-[3px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#C11212] to-red-400 transition-transform duration-300 group-hover:scale-x-100" />

      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#C11212]">
          {t(`${prefix}_tag`)}
        </span>
        {tier.quote && (
          <span className="shrink-0 rounded-full border border-[#C11212]/25 bg-[#FDECEC] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#C11212]">
            {t("common_customQuote")}
          </span>
        )}
      </div>
      <h3 className="mt-2 text-[22px] font-extrabold leading-tight text-[#0D1235]">{t(`${prefix}_name`)}</h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-black/55">{t(`${prefix}_scope`)}</p>

      <div className="mt-6 flex min-h-[50px] items-baseline gap-2">
        {tier.quote ? (
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wide text-black/45">
              {t(`${prefix}_quoteLabel`)}
            </span>
            <span className="mt-1.5 flex items-center gap-1.5 text-[18px] font-extrabold text-[#0D1235]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                className="h-4 w-4 text-[#C11212]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7M21 3l-9 9M10 21H3v-7" />
              </svg>
              {t("common_getQuote")}
            </span>
          </div>
        ) : (
          <>
            <span className="text-[11px] font-bold uppercase tracking-wide text-black/45">
              {t("common_from")}
            </span>
            <span className="text-[34px] font-extrabold tracking-tight text-[#0D1235]">
              <CountUp prefix="€" value={priceValue} />
            </span>
          </>
        )}
      </div>

      <div className="my-6 h-px bg-black/8" />

      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-3 text-[13.5px] leading-snug text-[#0D1235]/85">
            <CheckIcon />
            <span>{t(`${prefix}_feature${i}`)}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-black/8 bg-[#F7F8FB] p-4">
        <p className="mb-3 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#C11212]">
          <span className="h-[2px] w-3.5 rounded-full bg-[#C11212]" />
          {t("common_bestFit")}
        </p>
        <div className="divide-y divide-black/8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-2.5 py-2.5 text-[12px] first:pt-0 last:pb-0"
            >
              <span className="text-black/50">{t(`${prefix}_bestFit${i}Problem`)}</span>
              <FlowArrow />
              <span className="font-semibold text-[#0D1235]">{t(`${prefix}_bestFit${i}Solution`)}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        href={`/${locale}/contact`}
        className={[
          "mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-bold transition-all duration-200 active:scale-95",
          tier.featured
            ? "bg-gradient-to-r from-[#C11212] to-red-500 text-white shadow-[0_12px_30px_rgba(193,18,18,0.32)] hover:shadow-[0_16px_38px_rgba(193,18,18,0.45)]"
            : "bg-[#050A30] text-white hover:bg-[#0B1454]",
        ].join(" ")}
      >
        {t(`${prefix}_cta`)}
        <ArrowIcon />
      </Link>
    </div>
  );

  if (tier.featured) {
    return (
      <div
        className="campaign-card-in relative rounded-[28px] bg-gradient-to-br from-[#C11212] via-[#FF6B6B] to-[#C11212] p-[2px] shadow-[0_22px_55px_rgba(193,18,18,0.24)] transition-transform duration-300 hover:-translate-y-2"
        style={{ animationDelay: `${delay}ms` }}
      >
        <span className="campaign-pulse absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#C11212] to-red-500 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(193,18,18,0.4)]">
          ★ {t("common_mostPopular")}
        </span>
        {content}
      </div>
    );
  }

  return (
    <div
      className="campaign-card-in relative rounded-[28px] border border-black/10 shadow-[0_4px_18px_rgba(5,10,48,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_26px_60px_rgba(5,10,48,0.12)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {content}
    </div>
  );
};

export default PricingCard;
