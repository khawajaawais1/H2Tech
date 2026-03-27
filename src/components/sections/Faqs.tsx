"use client";
import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const faqKeys = ["faq1", "faq2", "faq3", "faq4", "faq5"];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const t = useTranslations("faqs");
  const locale = useLocale();

  return (
    <section id="faqs" className="w-full bg-white">
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[42%_58%] lg:gap-14">
          <div>
            <h2 className="text-[2.6rem] leading-none font-extrabold tracking-tight text-black">
              {t("heading")}
            </h2>
            <p className="mt-6 text-[1.02rem] leading-relaxed text-black/80">
              {t("description")}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="mt-10 rounded-lg inline-flex h-[46px] items-center justify-center bg-[#A20508] px-7 text-[0.95rem] font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#8a0406] active:scale-95"
            >
              {t("cta")}
            </Link>
          </div>

          <div className="w-full lg:max-w-[980px]">
            <div className="border-t border-black/10">
              {faqKeys.map((key, i) => {
                const isOpen = openIndex === i;

                return (
                  <div key={key} className="border-b border-black/10">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="w-full py-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-[1.05rem] sm:text-[1.12rem] font-semibold text-black">
                          {t(`${key}Q`)}
                        </span>

                        <span
                          className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/15 transition-transform duration-300"
                          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                          aria-hidden="true"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </div>
                    </button>

                    {/* Smooth expand/collapse */}
                    <div
                      className="grid transition-all duration-300 ease-in-out"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 text-[0.97rem] leading-relaxed text-black/65">
                          {t(`${key}A`)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;