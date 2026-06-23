"use client";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useRef, useState } from "react";
import { categories, type ServiceCategory } from "@/src/data/campaigns";
import PricingCard from "./PricingCard";

const PricingExplorer = () => {
  const t = useTranslations("campaigns");
  const [active, setActive] = useState<ServiceCategory["id"]>(categories[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const activeCategory = categories.find((c) => c.id === active) ?? categories[0];

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
    <section id="campaigns" ref={sectionRef} className="relative bg-[#F7F8FB] py-16 sm:py-20">
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
          <div className="no-scrollbar relative flex gap-2 overflow-x-auto rounded-[26px] border border-black/5 bg-white/90 p-2.5 shadow-[0_18px_45px_rgba(5,10,48,0.08)] backdrop-blur-xl">
            <span
              className="absolute top-2.5 bottom-2.5 rounded-2xl bg-gradient-to-br from-[#050A30] via-[#0B1454] to-[#1A2670] shadow-[0_10px_28px_rgba(5,10,48,0.35)] transition-all duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width }}
              aria-hidden="true"
            />
            {categories.map((cat) => {
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
                    "relative z-10 flex min-w-[140px] flex-1 flex-col items-center gap-1.5 whitespace-nowrap rounded-2xl px-3 py-3.5 transition-colors duration-300 sm:min-w-[170px] sm:flex-row sm:justify-center sm:gap-3 sm:px-4",
                    isActive ? "text-white" : "text-black/55 hover:text-[#0D1235]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                      isActive ? "scale-110 bg-white/15 text-white" : "bg-[#FDECEC] text-[#C11212]",
                    ].join(" ")}
                  >
                    {cat.icon}
                  </span>
                  <span className="flex flex-col items-center sm:items-start">
                    <span className="text-[13.5px] font-bold leading-tight">{t(`tab_${cat.id}`)}</span>
                    <span className={isActive ? "text-[10.5px] font-medium text-white/55" : "text-[10.5px] font-medium text-black/40"}>
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

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {activeCategory.tiers.map((tier, i) => (
              <PricingCard key={tier.id} categoryId={active} tier={tier} delay={i * 90} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingExplorer;
