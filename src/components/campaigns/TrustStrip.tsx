"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

const icons = [
  <path key="check" strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 6" />,
  <path
    key="star"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"
  />,
  <path
    key="shield"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 22s-8-4-8-12V5l8-3 8 3v5c0 8-8 12-8 12z"
  />,
  <g key="clock">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
  </g>,
];

const TrustStrip = () => {
  const t = useTranslations("campaigns");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-animate]").forEach((el, i) => {
              (el as HTMLElement).style.transitionDelay = `${i * 100}ms`;
              el.classList.add("animate-in");
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-16 sm:py-20">
      <style>{`
        [data-animate] { opacity:0; transform: translateY(26px); transition: opacity .6s ease, transform .6s ease; }
        [data-animate].animate-in { opacity:1; transform:none; }
      `}</style>

      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-8">
        <div data-animate className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold text-[#0D1235] sm:text-3xl">{t("trust_heading")}</h2>
          <p className="mt-2 text-sm text-black/55 sm:text-base">{t("trust_sub")}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              data-animate
              className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C11212]/30 hover:shadow-[0_18px_40px_rgba(5,10,48,0.1)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FDECEC] text-[#C11212] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  {icons[i - 1]}
                </svg>
              </div>
              <h4 className="mt-4 text-base font-bold text-[#0D1235]">{t(`trust${i}_title`)}</h4>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-black/55">{t(`trust${i}_body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
