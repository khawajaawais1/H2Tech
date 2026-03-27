// "use client";
// import { useRef } from "react";
// import { useTranslations, useLocale } from "next-intl";

// const Hero = () => {
//   const sectionRef = useRef<HTMLElement>(null);
//   const t = useTranslations("hero");
//   const locale = useLocale();

//   return (
//     <section ref={sectionRef} className="relative overflow-hidden min-h-screen">
      
//       <video
//         className="absolute inset-0 h-full w-full object-cover"
//         autoPlay
//         muted
//         loop
//         playsInline
//         preload="auto"
//       >
//         <source src="/3.mov" type="video/mp4" />
//       </video>

//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             "linear-gradient(180deg, rgba(5,10,48,0.25) 0%, rgba(5,10,48,0.35) 100%)",
//         }}
//       />

//       <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 min-h-screen pt-[180px] pb-[160px] md:pt-0 md:pb-0">
//         <h1
//           className="
//             text-white font-semibold tracking-tight leading-tight
//             text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
//             max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl
//             [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]
//           "
//         >
//           {t("title")}
//         </h1>

//         <p
//           className="
//             mt-6 mx-auto text-white/95 leading-relaxed
//             text-sm sm:text-base md:text-lg
//             max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl
//             [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]
//           "
//         >
//           {t("description")}
//         </p>

//         <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          
//             <a href={`/${locale}/services`}
//             className="inline-flex items-center justify-center bg-[#A20508] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#8a0406] active:scale-95 transition-all duration-200 rounded-sm w-44 sm:w-auto"
//           >
//             {t("cta")}
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;


"use client";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = useTranslations("hero");
  const locale = useLocale();

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const remaining = video.duration - video.currentTime;

    // Fade out in the last 1.5 seconds
    if (remaining <= 1.5) {
      video.style.opacity = String(Math.max(0, remaining / 1.5));
    } else {
      video.style.opacity = "1";
    }
  };

  const handleVideoEnd = () => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = "0";

    // Small pause at black before restarting
    setTimeout(() => {
      video.currentTime = 0;
      video.play();
      // Fade back in
      setTimeout(() => {
        video.style.opacity = "0.4";
      }, 100);
    }, 300);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-screen">

      {/* Black base so fade looks clean */}
      <div className="absolute inset-0 bg-black" />

      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        // No loop — we handle it manually for smooth transition
      >
        <source src="/3.mov" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,10,48,0.25) 0%, rgba(5,10,48,0.35) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 min-h-screen pt-[180px] pb-[160px] md:pt-0 md:pb-0">
        <h1
          className="
            text-white font-semibold tracking-tight leading-tight
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
            max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl
            [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]
          "
        >
          {t("title")}
        </h1>

        <p
          className="
            mt-6 mx-auto text-white/95 leading-relaxed
            text-sm sm:text-base md:text-lg
            max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl
            [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]
          "
        >
          {t("description")}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <a
            href={`/${locale}/services`}
            className="inline-flex rounded-lg items-center justify-center bg-[#A20508] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#8a0406] active:scale-95 transition-all duration-20 w-44 sm:w-auto"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;