"use client";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useRef, useState } from "react";
import { categories, type ServiceCategory } from "@/src/data/campaigns";
import PricingCard from "./PricingCard";

const PricingExplorer = () => {
  const t = useTranslations("campaigns");
  const orderedCategories = [
    categories.find((category) => category.id === "chatbots"),
    ...categories.filter((category) => category.id !== "chatbots"),
  ].filter(Boolean) as ServiceCategory[];
  const [active, setActive] = useState<ServiceCategory["id"]>(orderedCategories[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const activeCategory = orderedCategories.find((c) => c.id === active) ?? orderedCategories[0];

  useLayoutEffect(() => {
    const measure = () => {
      const el = tabRefs.current[active];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const handleSelect = (id: ServiceCategory["id"]) => {
    setActive(id);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="promotions" ref={sectionRef} className="relative overflow-x-hidden bg-[#F7F8FB] py-16 sm:py-20">
      <style>{`
        @keyframes campaignCardIn { from { opacity:0; transform: translateY(26px) scale(.97); } to { opacity:1; transform:none; } }
        .campaign-card-in { animation: campaignCardIn .55s cubic-bezier(.16,1,.3,1) both; }
        @keyframes campaignFadeUp { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform:none; } }
        .campaign-fade-up { animation: campaignFadeUp .45s ease both; }
        @keyframes campaignPulse { 0%,100% { box-shadow: 0 8px 20px rgba(193,18,18,.35); } 50% { box-shadow: 0 8px 26px rgba(193,18,18,.55); } }
        .campaign-pulse { animation: campaignPulse 2.4s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display:none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Tabs */}
        <div className="relative">
          <div className="pointer-events-none absolute -inset-x-4 -inset-y-4 -z-10 rounded-[40px] bg-gradient-to-r from-[#C11212]/8 via-transparent to-[#050A30]/8 blur-2xl" />
          <div className="pointer-events-none absolute bottom-2 right-0 top-2 z-10 w-16 rounded-r-[26px] bg-gradient-to-l from-white via-white/70 to-transparent sm:hidden" />
          <div className="pointer-events-none absolute bottom-2 left-0 top-2 z-10 w-5 rounded-l-[26px] bg-gradient-to-r from-white/80 to-transparent sm:hidden" />
          <div className="no-scrollbar relative flex snap-x snap-mandatory gap-1.5 overflow-x-auto rounded-[24px] border border-black/5 bg-white/90 p-1.5 pr-8 shadow-[0_14px_35px_rgba(5,10,48,0.08)] backdrop-blur-xl sm:gap-2 sm:rounded-[26px] sm:p-2.5 sm:pr-2.5 sm:shadow-[0_18px_45px_rgba(5,10,48,0.08)]">
            <span
              className="absolute top-2.5 bottom-2.5 hidden rounded-2xl bg-gradient-to-br from-[#050A30] via-[#0B1454] to-[#1A2670] shadow-[0_10px_28px_rgba(5,10,48,0.35)] transition-all duration-300 ease-out sm:block"
              style={{ left: indicator.left, width: indicator.width }}
              aria-hidden="true"
            />
            {orderedCategories.map((cat) => {
              const isActive = cat.id === active;
              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    tabRefs.current[cat.id] = el;
                  }}
                  type="button"
                  onClick={() => handleSelect(cat.id)}
                  className={[
                    "relative z-10 flex min-w-[96px] snap-start flex-col items-center gap-0.5 whitespace-nowrap rounded-[14px] px-2 py-2.5 transition-all duration-300 sm:min-w-[170px] sm:flex-1 sm:flex-row sm:justify-center sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3.5",
                    isActive
                      ? "bg-[#050A30] text-white shadow-[0_10px_24px_rgba(5,10,48,0.28)] sm:bg-transparent sm:shadow-none"
                      : "text-black/55 hover:text-[#0D1235]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-9 sm:w-9",
                      isActive ? "scale-110 bg-white/15 text-white" : "bg-[#FDECEC] text-[#C11212]",
                    ].join(" ")}
                  >
                    {cat.icon}
                  </span>
                  <span className="flex flex-col items-center sm:items-start">
                    <span className="text-[11.5px] font-bold leading-tight sm:text-[13.5px]">{t(`tab_${cat.id}`)}</span>
                    <span className={isActive ? "text-[9.5px] font-medium text-white/55 sm:text-[10.5px]" : "text-[9.5px] font-medium text-black/40 sm:text-[10.5px]"}>
                      {t("tab_badge")}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div key={active} className="campaign-fade-up mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-3 text-3xl font-extrabold text-[#0D1235] sm:text-4xl">
                <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-[#C11212] to-red-400" />
                {t(`${active}_heading`)}
              </h2>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-black/60">
                {t(`${active}_description`)}
              </p>
            </div>
            <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-[#0D1235] shadow-sm">
              {t(`${active}_pillNote`)}
            </span>
          </div>

          <div className="mt-8 grid auto-rows-fr grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {activeCategory.tiers.map((tier, i) => (
              <div key={tier.id} className="min-w-0 h-full">
                <PricingCard categoryId={active} tier={tier} delay={i * 90} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingExplorer;
