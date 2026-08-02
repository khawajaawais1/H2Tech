"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

const icons = [
  // rocket
  <path
    key="rocket"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 2c3 2 5 5.5 5 9.5 0 2-1 4-2 5l-3 3-3-3c-1-1-2-3-2-5C7 7.5 9 4 12 2zM9 16l-3 1 1-3M15 16l3 1-1-3M12 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
  />,
  // chat bubble
  <path
    key="chat"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M4 5h16v10H8l-4 4V5z"
  />,
  // globe
  <g key="globe">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </g>,
  // sprout
  <path
    key="sprout"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 21V10M12 10c0-4-3-6-7-6 0 4 3 6 7 6zM12 10c0-3 2.5-5 6-5 0 3.5-2.5 5-6 5z"
  />,
];

const WhyJoinUs = () => {
  const t = useTranslations("careers");
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
          <h2 className="text-2xl font-extrabold text-[#0D1235] sm:text-3xl">
            {t("whyHeadingPre")}
            <span className="bg-gradient-to-r from-red-600 to-gray-500 bg-clip-text text-transparent">
              {t("whyHeadingHighlight")}
            </span>
          </h2>
          <p className="mt-2 text-sm text-black/55 sm:text-base">{t("whySub")}</p>
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
              <h4 className="mt-4 text-base font-bold text-[#0D1235]">{t(`why${i}_title`)}</h4>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-black/55">{t(`why${i}_body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinUs;
