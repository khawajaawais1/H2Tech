"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

type FloatPhoto = {
  src: string;
  size: number;
  top: string;
  left?: string;
  right?: string;
  floatDuration: number;
  entryDelay: number;
};

const floatPhotos: FloatPhoto[] = [
  { src: "/float3.jpeg", size: 140, top: "6%", left: "1.5%", floatDuration: 7, entryDelay: 0.1 },
  { src: "/float6.jpeg", size: 96, top: "36%", left: "0.5%", floatDuration: 7.8, entryDelay: 0.25 },
  { src: "/what-is-a-chatbot.jpg", size: 108, top: "66%", left: "6%", floatDuration: 8.5, entryDelay: 0.4 },
  { src: "/float2.jpeg", size: 132, top: "5%", right: "2%", floatDuration: 7.5, entryDelay: 0.2 },
  { src: "/float5.jpeg", size: 112, top: "33%", right: "5%", floatDuration: 8.2, entryDelay: 0.35 },
  { src: "/float4.jpeg", size: 156, top: "60%", right: "0.5%", floatDuration: 9, entryDelay: 0.5 },
];

const pillIcons = [
  <path key="check" strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 6" />,
  <path key="cross" strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20" />,
  <g key="clock">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
  </g>,
];

const textIn = (delay: number) => ({ animation: `campaignTextIn 0.7s ease-out ${delay}s both` });

const CampaignHero = () => {
  const t = useTranslations("campaigns");

  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-14 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20">
      <style>{`
        @keyframes campaignTextIn { from { opacity:0; transform: translateY(26px); } to { opacity:1; transform:none; } }
        @keyframes campaignBlobDrift { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-24px) scale(1.08); } }
        @keyframes campaignPhotoIn { from { opacity:0; transform: translateY(20px) scale(.8); } to { opacity:1; transform:none; } }
        @keyframes campaignPhotoFloat { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(10px,-16px) rotate(3deg); } }
      `}</style>

      {floatPhotos.map((p) => (
        <div
          key={p.src}
          className="pointer-events-none absolute hidden overflow-hidden rounded-full shadow-[0_20px_45px_rgba(5,10,48,0.18)] ring-4 ring-white xl:block"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            right: p.right,
            animation: `campaignPhotoIn 0.8s ease-out ${p.entryDelay}s 1 both, campaignPhotoFloat ${p.floatDuration}s ease-in-out ${p.entryDelay + 0.8}s infinite`,
          }}
        >
          <Image src={p.src} alt="" fill className="object-cover" sizes={`${p.size}px`} />
        </div>
      ))}

      <div
        className="pointer-events-none absolute -top-32 left-[20%] h-[420px] w-[420px] rounded-full bg-[#C11212]/10 blur-[110px]"
        style={{ animation: "campaignBlobDrift 16s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute -top-16 right-[5%] h-[380px] w-[380px] rounded-full bg-[#050A30]/10 blur-[110px]"
        style={{ animation: "campaignBlobDrift 20s ease-in-out infinite reverse" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(5,10,48,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(5,10,48,.05) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span
          style={textIn(0)}
          className="inline-flex items-center gap-2 rounded-full border border-[#C11212]/20 bg-[#FDECEC] px-4 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-[#C11212]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C11212]/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C11212]" />
          </span>
          {t("hero_eyebrow")}
        </span>

        <h1
          style={textIn(0.12)}
          className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0D1235] sm:text-5xl md:text-6xl"
        >
          {t("hero_headingPre")}{" "}
          <span className="bg-gradient-to-r from-red-600 to-gray-500 bg-clip-text text-transparent">
            {t("hero_headingHighlight")}
          </span>
        </h1>

        <p style={textIn(0.24)} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-black/65 sm:text-lg">
          {t("hero_descriptionPre")}{" "}
          <strong className="font-semibold text-[#0D1235]">{t("hero_descriptionStrong")}</strong>
        </p>

        <div style={textIn(0.36)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[t("hero_pill1"), t("hero_pill2"), t("hero_pill3")].map((label, i) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-semibold text-[#0D1235] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className="h-3.5 w-3.5 text-[#C11212]">
                {pillIcons[i]}
              </svg>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignHero;
