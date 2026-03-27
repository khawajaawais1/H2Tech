import Image from "next/image";
import { useTranslations } from "next-intl";

const visionKeys = ["vision1", "vision2", "vision3"];

const Vision = () => {
  const t = useTranslations("vision");

  return (
    <section className="w-full bg-[#f3f3f3]">
      <div className="mx-auto px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="order-1">
            <div className="relative mx-auto w-full max-w-[560px] overflow-hidden">
              <div className="relative w-full aspect-[1/1]">
                <Image
                  src="/5.png"
                  alt={t("imageAlt")}
                  fill
                  className="object-fill"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="order-2 w-full">
            <div className="flex flex-col gap-10 sm:gap-12 lg:gap-14">
              {visionKeys.map((key, index) => (
                <div key={key} className="relative">
                  {index === 0 && (
                    <span
                      className="absolute left-[-20] top-1 h-[120px] w-[3px] bg-[#C11212]"
                      aria-hidden="true"
                    />
                  )}
                  <h3 className="text-[2rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-black sm:text-[2.2rem] lg:text-[2.45rem]">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="mt-4 max-w-[95%] text-[1rem] leading-[1.6] text-black/85 sm:text-[1.05rem] lg:max-w-[90%]">
                    {t(`${key}Body`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;