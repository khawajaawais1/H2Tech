"use client";

import { serviceKeys } from "@/src/helpers";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

type ServiceKey = {
  id: string;
  eyebrow: string;
  icon: React.ReactNode | null;
  image: string | null;
  className: string;
};

const ServiceCard = ({ item }: { item: ServiceKey }) => {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations("services");
  const key = item.id.replace(/-/g, "_");

  return (
    <article
      id={item.id}
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl bg-[#E9EFF3]",
        item.className
      )}
    >
      <div className="px-5 pb-6 pt-6 sm:px-6 sm:pb-7 sm:pt-7 lg:px-7 lg:pb-7 lg:pt-8">
        {item.icon && <div className="mb-6 lg:mb-8">{item.icon}</div>}

        {item.eyebrow && (
          <p className="mb-2 text-sm font-semibold text-[#0D1235] sm:text-[0.95rem]">
            {t(`${key}_eyebrow`)}
          </p>
        )}

        <h3 className="whitespace-pre-line text-[1.9rem] font-bold leading-[1.15] tracking-[-0.03em] text-[#0D1235] sm:text-[2.15rem] lg:text-[2.25rem]">
          {t(`${key}_title`)}
        </h3>

        <p className="mt-4 max-w-[95%] text-sm leading-[1.6] text-[#0D1235]/85 sm:text-[0.98rem]">
          {t(`${key}_description`)}
        </p>

        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            expanded ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr] mt-0"
          )}
        >
          <div className="overflow-hidden">
            <p className="max-w-[95%] text-sm leading-[1.7] text-[#0D1235]/75 sm:text-[0.96rem]">
              {t(`${key}_details`)}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="group mt-7 inline-flex flex-col items-start text-left text-[0.95rem] font-medium text-[#B10D10] sm:text-[0.98rem]"
        >
          <span className="inline-flex items-center gap-2">
            {expanded ? t("showLess") : t("learnMore")}
            <svg
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                expanded ? "rotate-90" : "group-hover:translate-x-1"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {expanded ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 15l-7-7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              )}
            </svg>
          </span>
          <span className="mt-1 block h-[2px] w-[10px] bg-[#B10D10]" />
        </button>
      </div>

      {typeof item.image === "string" && (
        <div className="relative mt-auto h-[220px] w-full sm:h-[250px] md:h-[280px] lg:h-[220px] xl:h-[240px]">
          <Image
            src={item.image}
            alt={t(`${key}_title`)}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
    </article>
  );
};

const AboutServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("services");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-animate]").forEach((el, i) => {
              (el as HTMLElement).style.transitionDelay = `${i * 120}ms`;
              el.classList.add("animate-in");
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="w-full bg-white">
      <div className="mx-auto w-full px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 xl:px-20">
        <div ref={sectionRef} className="mx-auto flex max-w-[1100px] flex-col items-center justify-center pb-10 text-center sm:pb-12 md:pb-14">
          <style>{`
            [data-animate] {
              opacity: 0;
              transform: translateY(28px);
              transition: opacity 0.75s ease, transform 0.75s ease;
            }
            [data-animate].animate-in {
              opacity: 1;
              transform: translateY(0);
            }
          `}</style>

          <h1
            data-animate
            className="mb-5 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent"
          >
            {t("heading")}
          </h1>

          <p
            data-animate
            className="max-w-full text-sm leading-relaxed text-black/80 sm:max-w-[85%] sm:text-base md:max-w-[70%] lg:max-w-[55%]"
          >
            {t("subheading")}
          </p>
        </div>

        <div className="mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto] lg:gap-7">
            {serviceKeys.map((item) => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;