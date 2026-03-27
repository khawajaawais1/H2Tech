import { buildKeys } from "@/src/helpers";
import Image from "next/image";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

type BuildKey = {
  id: string;
  icon?: React.ReactNode | null;
  image?: string | null;
  className?: string;
  hasBullets?: boolean;
};

const BuildCard = ({ item }: { item: BuildKey }) => {
  const t = useTranslations("build");
  const key = item.id.replace(/-/g, "_");
  const hasImage = Boolean(item.image);

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

        <h3 className="whitespace-pre-line text-[1.95rem] font-bold leading-[1.16] tracking-[-0.03em] text-[#0D1235] sm:text-[2.15rem] lg:text-[2.25rem]">
          {t(`${key}_title`)}
        </h3>

        {t.raw(`${key}_description`) && (
          <p className="mt-4 max-w-[95%] text-sm leading-[1.6] text-[#0D1235] sm:text-[0.98rem]">
            {t(`${key}_description`)}
          </p>
        )}

        {item.hasBullets && (
          <div className="mt-5 space-y-5">
            {(["bullet1", "bullet2", "bullet3"] as const).map((bKey) => (
              <div
                key={bKey}
                className="flex items-start gap-3 text-sm leading-[1.55] text-[#0D1235] sm:text-[0.98rem]"
              >
                <span className="mt-[0.55rem] block h-[4px] w-[4px] shrink-0 rounded-full bg-black" />
                <p>
                  <span className="font-bold text-[#0D1235]">
                    {t(`${key}_${bKey}_label`)}
                  </span>{" "}
                  {t(`${key}_${bKey}_text`)}
                </p>
              </div>
            ))}
          </div>
        )}

        {t.raw(`${key}_details`) && (
          <p className="mt-4 max-w-[95%] text-sm leading-[1.6] text-black/85 sm:text-[0.98rem]">
            {t(`${key}_details`)}
          </p>
        )}
      </div>

      {hasImage && (
        <div className="relative mt-auto h-[210px] w-full sm:h-[240px] md:h-[280px] lg:h-[210px] xl:h-[230px]">
          <Image
            src={item.image ?? ""}
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

const WhatWeBuild = () => {
  const t = useTranslations("build");

  return (
    <section className="w-full bg-[#f3f3f3]">
      <div className="mx-auto w-full px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto flex max-w-[920px] flex-col items-center justify-center pb-10 text-center sm:pb-12 md:pb-14">
          <h2 className="mb-5 text-4xl font-extrabold leading-tight bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent sm:text-5xl md:text-6xl lg:text-[4rem]">
            {t("heading")}
          </h2>
          <p className="max-w-full text-sm leading-relaxed text-black/85 sm:text-base md:max-w-[70%] lg:max-w-[58%]">
            {t("subheading")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto] lg:gap-7">
          {buildKeys.map((item) => (
            <BuildCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBuild;