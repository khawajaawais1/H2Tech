"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { PricingTier } from "@/src/data/campaigns";
import { designGalleries } from "@/src/data/designGalleries";
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

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-3.5 w-3.5 shrink-0">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="8.5" cy="9.5" r="1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5-9 9" />
  </svg>
);

const ChevronIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
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
  const gallery = designGalleries[prefix];
  const [activeSite, setActiveSite] = useState<number | null>(null);
  const [activePage, setActivePage] = useState(0);
  const priceValue = tier.priceFrom ? Number(tier.priceFrom.replace(/[^\d]/g, "")) : 0;
  const contactMessage = [
    `Hi Happy2Tech, I'm interested in the ${t(`${prefix}_name`)} plan under ${t(`${categoryId}_heading`)}.`,
    "",
    `Scope: ${t(`${prefix}_scope`)}`,
    `Preferred next step: ${t(`${prefix}_cta`)}`,
    "",
    "Please share the next steps, timeline, and quote details.",
  ].join("\n");
  const contactHref = `/${locale}/contact?topic=${encodeURIComponent("Project Request")}&message=${encodeURIComponent(contactMessage)}`;

  const siteCount = gallery?.length ?? 0;
  const totalPages = gallery?.reduce((sum, site) => sum + site.pages.length, 0) ?? 0;
  const currentSite = gallery && activeSite !== null ? gallery[activeSite] : null;
  const pageCount = currentSite?.pages.length ?? 0;
  const currentPage = currentSite && pageCount > 0 ? currentSite.pages[Math.min(activePage, pageCount - 1)] : null;

  const openSite = (index: number) => {
    setActiveSite(index);
    setActivePage(0);
  };
  const goToPage = useCallback(
    (index: number) => setActivePage(((index % pageCount) + pageCount) % pageCount),
    [pageCount]
  );

  useEffect(() => {
    if (activeSite === null || !gallery) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveSite(null);
      if (event.key === "ArrowRight") goToPage(activePage + 1);
      if (event.key === "ArrowLeft") goToPage(activePage - 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSite, activePage, gallery, goToPage]);

  // Warm the browser cache for the neighboring pages so prev/next feels instant.
  useEffect(() => {
    if (activeSite === null || !currentSite || pageCount < 2) return;
    [activePage - 1, activePage + 1].forEach((i) => {
      const neighbor = currentSite.pages[((i % pageCount) + pageCount) % pageCount];
      const img = new window.Image();
      img.src = neighbor.src;
    });
  }, [activeSite, activePage, currentSite, pageCount]);

  const PEEK_COUNT = 2;
  const designSamples = gallery && (
    <div className="pointer-events-none absolute -top-20 left-5 right-5 z-0 flex gap-3 opacity-0 transition-all duration-500 ease-out group-hover/card:-top-28 group-hover/card:opacity-100 sm:-top-16 sm:left-7 sm:right-7 sm:group-hover/card:-top-24">
      {gallery.slice(0, PEEK_COUNT).map((site, index) => {
        const remaining = siteCount - PEEK_COUNT;
        const showMoreBadge = index === PEEK_COUNT - 1 && remaining > 0;
        const thumb = site.pages[0];
        return (
          <button
            key={site.title}
            type="button"
            onClick={() => openSite(index)}
            className="pointer-events-auto group/design relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-white/80 bg-white p-1.5 text-left shadow-[0_18px_40px_rgba(5,10,48,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(193,18,18,0.22)]"
            style={{ transitionDelay: `${index * 70}ms` }}
            aria-label={showMoreBadge ? `View all ${siteCount} sample sites` : `Open ${site.title}`}
          >
            <span className="relative block aspect-[16/10] overflow-hidden rounded-xl bg-[#F7F8FB]">
              <Image
                src={thumb.src}
                alt={site.title}
                fill
                sizes="(max-width: 640px) 130px, 160px"
                loading="lazy"
                placeholder="blur"
                blurDataURL={thumb.blurDataURL}
                unoptimized
                className="object-cover object-top transition-transform duration-500 group-hover/design:scale-105"
              />
              {showMoreBadge && (
                <span className="absolute inset-0 flex items-center justify-center bg-[#050A30]/60 text-sm font-extrabold text-white backdrop-blur-[1px]">
                  +{remaining}
                </span>
              )}
            </span>
            <span className="mt-1.5 block truncate px-1 text-[10px] font-extrabold uppercase tracking-wide text-[#0D1235]">
              {showMoreBadge ? `View all ${siteCount}` : site.title}
            </span>
          </button>
        );
      })}
    </div>
  );

  const designModal =
    currentSite && currentPage && gallery
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050A30]/80 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={currentSite.title}
            onClick={() => setActiveSite(null)}
          >
            <div
              className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#C11212]">
                    {t(`${prefix}_name`)}
                    {pageCount > 1 ? ` · ${activePage + 1} / ${pageCount}` : ""}
                  </p>
                  <h4 className="truncate text-base font-extrabold text-[#0D1235] sm:text-lg">
                    {currentSite.title}
                    {pageCount > 1 ? ` — ${currentPage.title}` : ""}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSite(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F8FB] text-xl font-bold leading-none text-[#0D1235] transition-colors hover:bg-[#FDECEC] hover:text-[#C11212]"
                  aria-label="Close design preview"
                >
                  x
                </button>
              </div>

              {siteCount > 1 && (
                <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-black/10 bg-[#F7F8FB] px-3 py-2 sm:px-5">
                  {gallery.map((site, index) => (
                    <button
                      key={site.title}
                      type="button"
                      onClick={() => openSite(index)}
                      className={[
                        "shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-bold transition-colors",
                        index === activeSite
                          ? "bg-[#050A30] text-white"
                          : "bg-white text-[#0D1235]/60 hover:text-[#0D1235]",
                      ].join(" ")}
                    >
                      {site.title}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative flex-1 overflow-hidden bg-[#F7F8FB]">
                {pageCount > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => goToPage(activePage - 1)}
                      className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0D1235] shadow-[0_8px_20px_rgba(5,10,48,0.25)] transition-colors hover:bg-white hover:text-[#C11212]"
                      aria-label="Previous page"
                    >
                      <ChevronIcon direction="left" />
                    </button>
                    <button
                      type="button"
                      onClick={() => goToPage(activePage + 1)}
                      className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0D1235] shadow-[0_8px_20px_rgba(5,10,48,0.25)] transition-colors hover:bg-white hover:text-[#C11212]"
                      aria-label="Next page"
                    >
                      <ChevronIcon direction="right" />
                    </button>
                  </>
                )}
                <div className="max-h-[calc(92vh_-_73px_-_64px)] overflow-auto p-3 sm:p-5">
                  <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-[0_14px_45px_rgba(5,10,48,0.12)]">
                    <Image
                      key={currentPage.src}
                      src={currentPage.src}
                      alt={currentPage.title}
                      width={currentPage.width}
                      height={currentPage.height}
                      sizes="(max-width: 1024px) 94vw, 896px"
                      placeholder="blur"
                      blurDataURL={currentPage.blurDataURL}
                      unoptimized
                      className="h-auto w-full"
                      priority
                    />
                  </div>
                </div>
              </div>

              {pageCount > 1 && (
                <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-black/10 bg-white p-2.5 sm:p-3">
                  {currentSite.pages.map((page, index) => (
                    <button
                      key={page.src}
                      type="button"
                      onClick={() => goToPage(index)}
                      className={[
                        "relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-14 sm:w-20",
                        index === activePage ? "border-[#C11212]" : "border-transparent opacity-70 hover:opacity-100",
                      ].join(" ")}
                      aria-label={`View ${page.title}`}
                    >
                      <Image
                        src={page.src}
                        alt={page.title}
                        fill
                        sizes="80px"
                        loading="lazy"
                        unoptimized
                        className="object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body
        )
      : null;

  const content = (
    <div className="group relative z-10 flex h-full min-w-0 flex-col rounded-[22px] bg-white p-5 sm:rounded-[26px] sm:p-8 lg:p-6 xl:p-7">
      <span className="absolute left-7 right-7 top-0 h-[3px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#C11212] to-red-400 transition-transform duration-300 group-hover:scale-x-100" />

      <div className="flex min-h-[108px] min-w-0 flex-col lg:h-[108px]">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <span className="min-w-0 break-words text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#C11212]">
            {t(`${prefix}_tag`)}
          </span>
          {tier.quote && (
            <span className="shrink-0 rounded-full border border-[#C11212]/25 bg-[#FDECEC] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#C11212]">
              {t("common_customQuote")}
            </span>
          )}
        </div>
        <h3 className="mt-2 min-w-0 break-words text-[21px] font-extrabold leading-tight text-[#0D1235] sm:text-[22px]">{t(`${prefix}_name`)}</h3>
        <p className="mt-2 min-w-0 break-words text-[13.5px] leading-relaxed text-black/55">{t(`${prefix}_scope`)}</p>
      </div>

      {gallery && (
        <button
          type="button"
          onClick={() => openSite(0)}
          className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#C11212]/25 bg-[#FDECEC] px-3 py-1.5 text-[11px] font-bold text-[#C11212] transition-colors active:scale-95 hover:bg-[#C11212] hover:text-white"
        >
          <ImageIcon />
          {t("common_viewSamples", { count: totalPages })}
        </button>
      )}

      <div className="mt-4 flex min-h-[50px] min-w-0 items-baseline gap-2">
        {tier.quote ? (
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wide text-black/45">
              {t(`${prefix}_quoteLabel`)}
            </span>
            <span className="mt-1 flex items-center gap-1.5 text-[18px] font-extrabold text-[#0D1235]">
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
            <span className="inline-block min-w-[92px] text-[34px] font-extrabold tabular-nums tracking-tight text-[#0D1235]">
              <CountUp prefix="€" value={priceValue} />
            </span>
          </>
        )}
      </div>

      <div className="my-5 h-px bg-black/8" />

      <div className="space-y-2.5 lg:h-[106px]">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex min-w-0 items-start gap-3 text-[13.5px] leading-snug text-[#0D1235]/85">
            <CheckIcon />
            <span className="min-w-0 break-words">{t(`${prefix}_feature${i}`)}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-black/8 bg-[#F7F8FB] p-4 lg:h-[168px]">
        <p className="mb-3 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#C11212]">
          <span className="h-[2px] w-3.5 rounded-full bg-[#C11212]" />
          {t("common_bestFit")}
        </p>
        <div className="divide-y divide-black/8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2.5 py-2 text-[12px] first:pt-0 last:pb-0"
            >
              <span className="min-w-0 break-words text-black/50">{t(`${prefix}_bestFit${i}Problem`)}</span>
              <FlowArrow />
              <span className="min-w-0 break-words font-semibold text-[#0D1235]">{t(`${prefix}_bestFit${i}Solution`)}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        href={contactHref}
        className={[
          "mt-6 inline-flex w-full min-w-0 items-center justify-center gap-2 whitespace-normal rounded-full px-5 py-3.5 text-center text-[14px] font-bold transition-all duration-200 active:scale-95",
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
        className="campaign-card-in group/card relative h-full min-w-0 rounded-[24px] bg-gradient-to-br from-[#C11212] via-[#FF6B6B] to-[#C11212] p-[2px] shadow-[0_22px_55px_rgba(193,18,18,0.24)] transition-transform duration-300 hover:-translate-y-2 sm:rounded-[28px]"
        style={{ animationDelay: `${delay}ms` }}
      >
        <span className="campaign-pulse absolute -top-3.5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#C11212] to-red-500 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(193,18,18,0.4)]">
          ★ {t("common_mostPopular")}
        </span>
        {designSamples}
        {content}
        {designModal}
      </div>
    );
  }

  return (
    <div
      className="campaign-card-in group/card relative h-full min-w-0 rounded-[24px] border border-black/10 shadow-[0_4px_18px_rgba(5,10,48,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_26px_60px_rgba(5,10,48,0.12)] sm:rounded-[28px]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {designSamples}
      {content}
      {designModal}
    </div>
  );
};

export default PricingCard;
