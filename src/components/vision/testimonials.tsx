"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";

const ProjectsGrid = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let curY = 0;
    let tgtY = 0;
    let raf: number;
    let running = false;

    const onScroll = () => {
      const delta = window.scrollY - lastY;
      lastY = window.scrollY;
      tgtY += delta * 0.035;
      tgtY = Math.max(-15, Math.min(15, tgtY));
      if (!running) { running = true; raf = requestAnimationFrame(tick); }
    };

    const tick = () => {
      curY += (tgtY - curY) * 0.08;
      tgtY += (0 - tgtY) * 0.05;
      if (ref.current) ref.current.style.transform = `translateY(${curY}px)`;
      if (Math.abs(curY) > 0.05 || Math.abs(tgtY) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        curY = 0; tgtY = 0; running = false;
        if (ref.current) ref.current.style.transform = "translateY(0px)";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Horizontal lines config
  const hLines = [
    { y: 15, color: "rgba(255,255,255,0.07)", width: "0.12", dash: "" },
    { y: 28, color: "rgba(177,13,16,0.4)",    width: "0.15", dash: "8 6" },
    { y: 40, color: "rgba(255,255,255,0.05)", width: "0.1",  dash: "" },
    { y: 50, color: "rgba(38,72,255,0.35)",   width: "0.15", dash: "20 8" },
    { y: 60, color: "rgba(255,255,255,0.05)", width: "0.1",  dash: "" },
    { y: 72, color: "rgba(251,191,36,0.3)",   width: "0.15", dash: "6 10" },
    { y: 85, color: "rgba(255,255,255,0.07)", width: "0.12", dash: "" },
  ];

  // Vertical lines config
  const vLines = [
    { x: 12, color: "rgba(255,255,255,0.06)", width: "0.12", dash: "" },
    { x: 25, color: "rgba(177,13,16,0.35)",   width: "0.15", dash: "6 8" },
    { x: 38, color: "rgba(255,255,255,0.04)", width: "0.1",  dash: "" },
    { x: 50, color: "rgba(38,72,255,0.3)",    width: "0.15", dash: "14 6" },
    { x: 62, color: "rgba(255,255,255,0.04)", width: "0.1",  dash: "" },
    { x: 75, color: "rgba(251,191,36,0.28)",  width: "0.15", dash: "4 12" },
    { x: 88, color: "rgba(255,255,255,0.06)", width: "0.12", dash: "" },
  ];

  // Intersection glow dots where colored lines cross
  const glowDots = [
    { cx: 25, cy: 28, color: "#B10D10",  r: 0.7,  opacity: 0.6 },
    { cx: 50, cy: 50, color: "#2648ff",  r: 0.9,  opacity: 0.5 },
    { cx: 75, cy: 72, color: "#fbbf24",  r: 0.7,  opacity: 0.55 },
    { cx: 25, cy: 72, color: "#fbbf24",  r: 0.5,  opacity: 0.4 },
    { cx: 75, cy: 28, color: "#B10D10",  r: 0.5,  opacity: 0.45 },
    { cx: 50, cy: 28, color: "#2648ff",  r: 0.4,  opacity: 0.35 },
    { cx: 25, cy: 50, color: "#B10D10",  r: 0.4,  opacity: 0.3 },
    { cx: 75, cy: 50, color: "#fbbf24",  r: 0.4,  opacity: 0.3 },
  ];

  return (
    <>
      <style>{`
        .grid-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          will-change: transform;
          overflow: hidden;
        }
        .grid-svg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
        }
      `}</style>

      <div ref={ref} className="grid-canvas">
        <svg
          className="grid-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Fade mask — fades lines toward edges */}
            <radialGradient id="pgFade" cx="50%" cy="50%" r="65%">
              <stop offset="0%"   stopColor="white" stopOpacity="1" />
              <stop offset="55%"  stopColor="white" stopOpacity="0.6" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="pgMask">
              <rect width="100" height="100" fill="url(#pgFade)" />
            </mask>

            {/* Glow filter for intersection dots */}
            <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Line glow filter */}
            <filter id="lineGlow" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="0.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g mask="url(#pgMask)">
            {/* Horizontal lines */}
            {hLines.map((line, i) => (
              <line
                key={`h-${i}`}
                x1="0" y1={line.y}
                x2="100" y2={line.y}
                stroke={line.color}
                strokeWidth={line.width}
                strokeDasharray={line.dash || undefined}
                filter={line.dash ? "url(#lineGlow)" : undefined}
              />
            ))}

            {/* Vertical lines */}
            {vLines.map((line, i) => (
              <line
                key={`v-${i}`}
                x1={line.x} y1="0"
                x2={line.x} y2="100"
                stroke={line.color}
                strokeWidth={line.width}
                strokeDasharray={line.dash || undefined}
                filter={line.dash ? "url(#lineGlow)" : undefined}
              />
            ))}

            {/* Intersection glow dots */}
            {glowDots.map((dot, i) => (
              <circle
                key={`dot-${i}`}
                cx={dot.cx} cy={dot.cy}
                r={dot.r}
                fill={dot.color}
                opacity={dot.opacity}
                filter="url(#dotGlow)"
              />
            ))}

            {/* Small tick marks on colored h-lines at edges */}
            {[28, 50, 72].map((y, i) => (
              <g key={`tick-h-${i}`}>
                <line x1="0" y1={y - 1.5} x2="0" y2={y + 1.5}
                  stroke={["rgba(177,13,16,0.5)", "rgba(38,72,255,0.5)", "rgba(251,191,36,0.5)"][i]}
                  strokeWidth="0.4" />
                <line x1="100" y1={y - 1.5} x2="100" y2={y + 1.5}
                  stroke={["rgba(177,13,16,0.5)", "rgba(38,72,255,0.5)", "rgba(251,191,36,0.5)"][i]}
                  strokeWidth="0.4" />
              </g>
            ))}

            {/* Small tick marks on colored v-lines at edges */}
            {[25, 50, 75].map((x, i) => (
              <g key={`tick-v-${i}`}>
                <line x1={x - 1.5} y1="0" x2={x + 1.5} y2="0"
                  stroke={["rgba(177,13,16,0.5)", "rgba(38,72,255,0.5)", "rgba(251,191,36,0.5)"][i]}
                  strokeWidth="0.4" />
                <line x1={x - 1.5} y1="100" x2={x + 1.5} y2="100"
                  stroke={["rgba(177,13,16,0.5)", "rgba(38,72,255,0.5)", "rgba(251,191,36,0.5)"][i]}
                  strokeWidth="0.4" />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </>
  );
};
const projectKeys = ["p1", "p2", "p3", "p4", "p5"];

const projectMeta = [
  { id: 1, image: "/gtrap.svg", link: "https://admin.etrapp.com/" },
  {
    id: 2,
    image: "/detroit.png",
    link: "https://detroitlionsprod-portal.azurewebsites.net",
  },
  {
    id: 3,
    image: "/aerovera.png",
    link: "https://app-aeroveraiq-fe-dev-eus.azurewebsites.net/",
  },
  { id: 4, image: "/nose.png", link: "https://labs.enose.ai/" },
  { id: 5, image: "/shuttle.jpeg", link: "https://app.shuttlepro.io/" },
];

const testimonialKeys = ["t1", "t2", "t3", "t4"];

export const ProjectsSection = () => {
  const t = useTranslations("projects");
  const [hovered, setHovered] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const cardGap = 24;
  const getCardWidth = () => {
    if (!trackRef.current) return 0;
    const container = trackRef.current.parentElement!.offsetWidth;
    return (container - cardGap * (visibleCount - 1)) / visibleCount;
  };

  const scrollBy = (direction: "prev" | "next") => {
    if (!trackRef.current) return;
    const amount = (getCardWidth() + cardGap) * (direction === "next" ? 1 : -1);
    trackRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const startAuto = () => {
    autoScrollRef.current = setInterval(() => {
      if (!trackRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 4) {
        trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollBy("next");
      }
    }, 3500);
  };

  useEffect(() => {
    startAuto();
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [visibleCount]);

  const pauseAuto = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
  };
  const resumeAuto = () => {
    pauseAuto();
    startAuto();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        pauseAuto();
        scrollBy("prev");
        setTimeout(resumeAuto, 3000);
      }
      if (e.key === "ArrowRight") {
        pauseAuto();
        scrollBy("next");
        setTimeout(resumeAuto, 3000);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [visibleCount]);

  const cardWidthStyle =
    visibleCount === 1
      ? "100%"
      : visibleCount === 2
      ? "calc(50% - 12px)"
      : "calc(33.333% - 16px)";

  return (
    <section className="w-full bg-white overflow-hidden">
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
        .projects-track {
          display: flex;
          gap: 24px;
          overflow-x: scroll;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          cursor: grab;
        }
        .projects-track::-webkit-scrollbar { display: none; }
        .projects-track:active { cursor: grabbing; }
        .project-card { scroll-snap-align: start; }
      `}</style>

      {/* Header */}
      <div
  ref={headerRef}
  className="relative overflow-hidden bg-[#050A30] px-5 py-16 text-white sm:px-8  md:px-12  lg:px-16 xl:px-20"
>
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
    .rings-container {
      position: absolute;
      inset: 0;
      pointer-events: none;
      will-change: transform;
      overflow: hidden;
    }
    .ring-svg {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
    }
  `}</style>

  <div className="pointer-events-none absolute inset-0" />
  <div className="pointer-events-none absolute left-1/2 top-[-160px] h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[90px]" />
  <div className="pointer-events-none absolute bottom-[-120px] right-[-120px] h-[340px] w-[340px] rounded-full bg-[#A20508]/20 blur-[120px]" />

  {/* Rings — self contained, no external component needed */}
  <ProjectsGrid />

  <div className="relative mx-auto max-w-[1400px] text-center">
    <h1
      data-animate
      className="mb-5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/80 sm:text-xs"
    >
      {t("badge")}
    </h1>
    <h2
      data-animate
      className="mx-auto max-w-[280px] font-light leading-[1.1] tracking-[-0.03em] text-white sm:max-w-xl sm:text-[3rem] md:max-w-3xl  lg:max-w-5xl  xl:max-w-[1300px] xl:text-[6.8rem]"
    >
      {t("heading")}
    </h2>
    <p
      data-animate
      className="mt-6 mx-auto max-w-sm text-sm sm:max-w-lg sm:text-base leading-relaxed text-white/50"
    >
      {t("subheading")}
    </p>

    <div data-animate className="flex items-center justify-center gap-3 mt-10">
      {[
        { dir: "prev" as const, d: "M15 19l-7-7 7-7" },
        { dir: "next" as const, d: "M9 5l7 7-7 7" },
      ].map((btn, i) => (
        <button
          key={i}
          onClick={() => { pauseAuto(); scrollBy(btn.dir); setTimeout(resumeAuto, 3000); }}
          className="w-11 h-11 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white transition-all duration-200 hover:bg-white hover:text-[#050A30]"
          aria-label={btn.dir === "prev" ? t("prevLabel") : t("nextLabel")}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={btn.d} />
          </svg>
        </button>
      ))}
    </div>
  </div>
</div>

      {/* Carousel */}
      <div className="px-5 py-12 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div
          ref={trackRef}
          className="projects-track"
          onMouseEnter={pauseAuto}
          onMouseLeave={resumeAuto}
          onTouchStart={pauseAuto}
          onTouchEnd={() => setTimeout(resumeAuto, 2000)}
        >
          {projectMeta.map((meta, idx) => {
            const key = projectKeys[idx];
            return (
              <div
                key={meta.id}
                onMouseEnter={() => setHovered(meta.id)}
                onMouseLeave={() => setHovered(null)}
                className="project-card shrink-0 min-w-0 group"
                style={{ flex: `0 0 ${cardWidthStyle}` }}
              >
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-[#E9EFF3]"
                  style={{ aspectRatio: "16/10" }}
                >
                  <Image
                    src={meta.image}
                    alt={t(`${key}Title`)}
                    fill
                    className="object-scale-down transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(5,10,48,0.65) 0%, transparent 60%)",
                      opacity: hovered === meta.id ? 1 : 0,
                    }}
                  />
                  <div
                    className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-semibold text-[#0D1235] z-10 transition-all duration-300"
                    style={{
                      opacity: hovered === meta.id ? 1 : 0,
                      transform:
                        hovered === meta.id
                          ? "translateY(0)"
                          : "translateY(6px)",
                    }}
                  >
                    {t(`${key}Stat`)}
                  </div>
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest text-white bg-[#050A30]/70 backdrop-blur-sm">
                      {t(`${key}Tag`)}
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#0D1235] leading-snug">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/55 line-clamp-3">
                    {t(`${key}Description`)}
                  </p>

                  <a
                    href={meta.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#B10D10] group/link"
                  >
                    {t("viewProject")}
                    <svg
                      className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const TestimonialsSection = () => {
  const t = useTranslations("testimonials");
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % testimonialKeys.length);
    }, 5000);
  };

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSelect = (i: number) => {
    setActive(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAuto();
  };

  const key = testimonialKeys[active];

  return (
    <section className="w-full bg-[#EEEEEE] overflow-hidden">
      <style>{`
        @keyframes progressFill { from { width: 0% } to { width: 100% } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 xl:px-20">
        <div className="text-center mb-12 md:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B10D10] mb-3">
            {t("badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D1235] leading-tight">
            {t("heading")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16 max-w-5xl mx-auto">
          {/* Left — client tabs desktop */}
          <div className="hidden lg:flex flex-col gap-1">
            {testimonialKeys.map((k, i) => (
              <button
                key={k}
                onClick={() => handleSelect(i)}
                className="text-left px-5 py-4 transition-all duration-200"
                style={{
                  borderLeft: `2px solid ${
                    active === i ? "#B10D10" : "transparent"
                  }`,
                  background:
                    active === i ? "rgba(13,18,53,0.05)" : "transparent",
                }}
              >
                <p
                  className="text-sm font-semibold transition-colors duration-200"
                  style={{
                    color: active === i ? "#0D1235" : "rgba(13,18,53,0.4)",
                  }}
                >
                  {t(`${k}Name`)}
                </p>
                <p
                  className="text-xs mt-1 transition-colors duration-200"
                  style={{
                    color:
                      active === i
                        ? "rgba(13,18,53,0.6)"
                        : "rgba(13,18,53,0.3)",
                  }}
                >
                  {t(`${k}Role`)}
                </p>
                <p
                  className="text-xs mt-0.5 transition-colors duration-200"
                  style={{
                    color:
                      active === i
                        ? "rgba(13,18,53,0.4)"
                        : "rgba(13,18,53,0.2)",
                  }}
                >
                  {t(`${k}Country`)}
                </p>
                {active === i && (
                  <div className="mt-3 h-0.5 bg-[#0D1235]/10 relative overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-[#B10D10]"
                      style={{ animation: "progressFill 5s linear infinite" }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Right — quote */}
          <div key={active} style={{ animation: "fadeUp 0.4s ease" }}>
            <div className="text-[80px] sm:text-[100px] leading-none text-[#B10D10]/20 font-bold select-none">
              "
            </div>
            <blockquote className="mt-2 text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed text-black/80">
              {t(`${key}Quote`)}
            </blockquote>
            <div className="mt-8 pt-6 border-t border-[#0D1235]/10 flex flex-wrap sm:flex-nowrap items-center gap-4">
              <div className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-[#B10D10] to-[#2A3052]">
                <span className="text-white font-semibold text-sm">
                  {t(`${key}Name`)
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0D1235]">
                  {t(`${key}Name`)}
                </p>
                <p className="text-xs text-[#0D1235]/50 mt-1">
                  {t(`${key}Role`)} · {t(`${key}Country`)}
                </p>
              </div>
              <div className="flex gap-1 sm:ml-auto">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    fill="#F59E0B"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile dots */}
        <div className="flex justify-center gap-2 mt-10 lg:hidden">
          {testimonialKeys.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className="h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-200"
              style={{
                width: active === i ? 20 : 6,
                background: active === i ? "#B10D10" : "rgba(13,18,53,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
