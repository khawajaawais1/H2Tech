"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactSection = () => {
  const t = useTranslations("contact");
  const sectionRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const roleOptions = [
    t("roleDesigner"),
    t("roleDeveloper"),
    t("roleProductManager"),
    t("roleTeamLead"),
    t("roleExecutive"),
    t("roleIntern"),
    t("roleOther"),
  ];

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

  const validationSchema = Yup.object({
    firstName: Yup.string().min(2, t("errorMinName")).required(t("errorRequired")),
    lastName: Yup.string().min(2, t("errorMinName")).required(t("errorRequired")),
    email: Yup.string().email(t("errorEmail")).required(t("errorRequired")),
    phone: Yup.string().optional(),
    topic: Yup.string().required(t("errorRequired")),
    role: Yup.string().optional(),
    message: Yup.string().min(2, t("errorMinMessage")).required(t("errorRequired")),
    agreed: Yup.boolean().oneOf([true], t("errorAgree")),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      topic: "",
      role: "",
      message: "",
      agreed: false,
    },
    validationSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      try {
        const res = await fetch(`/${locale}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        console.log(res,'this is res')
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Something went wrong.");
        setStatus({ type: "success", message: t("successMessage") });
        resetForm();
      } catch (error: any) {
        setStatus({ type: "error", message: error.message || t("errorMessage") });
      }
    },
  });

  return (
    <section id="contact" className="w-full bg-[#f3f3f3]">
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
        .float-field { position: relative; }
        .float-input {
          width: 100%;
          height: 56px;
          padding: 20px 16px 6px;
          border: 1.5px solid rgba(0,0,0,0.15);
          border-radius: 8px;
          background: white;
          font-size: 14px;
          color: #000;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .float-input:focus { border-color: #050A30; }
        .float-input.error { border-color: #B10D10; }
        .float-label {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: rgba(0,0,0,0.45);
          pointer-events: none;
          transition: all 0.2s ease;
          background: white;
          padding: 0 2px;
        }
        .float-input:focus ~ .float-label,
        .float-input.has-value ~ .float-label {
          top: 10px;
          transform: translateY(0);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #050A30;
        }
        .float-input.error ~ .float-label { color: #B10D10; }

        .float-textarea {
          width: 100%;
          padding: 24px 16px 8px;
          border: 1.5px solid rgba(0,0,0,0.15);
          border-radius: 8px;
          background: white;
          font-size: 14px;
          color: #000;
          outline: none;
          resize: none;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }
        .float-textarea:focus { border-color: #050A30; }
        .float-textarea.error { border-color: #B10D10; }
        .float-textarea ~ .float-label { top: 20px; transform: translateY(0); }
        .float-textarea:focus ~ .float-label,
        .float-textarea.has-value ~ .float-label {
          top: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #050A30;
        }
        .float-textarea.error ~ .float-label { color: #B10D10; }

        .float-select {
          width: 100%;
          height: 56px;
          padding: 20px 16px 6px;
          border: 1.5px solid rgba(0,0,0,0.15);
          border-radius: 8px;
          background: white;
          font-size: 14px;
          color: #000;
          outline: none;
          appearance: none;
          transition: border-color 0.2s ease;
          cursor: pointer;
        }
        .float-select:focus { border-color: #050A30; }
        .float-select.error { border-color: #B10D10; }
        .float-select ~ .float-label { pointer-events: none; }
        .float-select.has-value ~ .float-label,
        .float-select:focus ~ .float-label {
          top: 10px;
          transform: translateY(0);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #050A30;
        }
      `}</style>

      {/* Hero */}
      {/* <div
        ref={sectionRef}
        className="relative overflow-hidden bg-[#050A30] px-5 py-20 text-white sm:px-8 md:px-12 md:py-24 lg:px-16 lg:py-28 xl:px-20"
      >
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle at 20% 30%, rgba(38,72,255,0.25) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(162,5,8,0.28) 0%, transparent 50%), linear-gradient(160deg, #050A30 0%, #0B1245 40%, #1A2266 75%, #2A2F78 100%)` }} />
        <div className="pointer-events-none absolute left-1/2 top-[-160px] h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-[-120px] right-[-120px] h-[340px] w-[340px] rounded-full bg-[#A20508]/20 blur-[120px]" />
        <div className="relative mx-auto max-w-[1400px] text-center">
          <h1 data-animate className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-white/80 sm:text-sm">
            {t("badge")}
          </h1>
          <h2 data-animate className="mx-auto max-w-[1300px] text-[1.3rem] font-light leading-[0.98] tracking-[-0.03em] text-white sm:text-[4rem] md:text-[5.3rem] lg:text-[6.2rem] xl:text-[6.8rem]">
            {t("heading")}
          </h2>
        </div>
      </div> */}
      {/* Hero */}
<div
  ref={sectionRef}
  className="relative overflow-hidden bg-[#050A30] px-5 py-16 text-white sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 lg:py-28 xl:px-20"
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
  `}</style>

  <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(circle at 20% 30%, rgba(38,72,255,0.25) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(162,5,8,0.28) 0%, transparent 50%), linear-gradient(160deg, #050A30 0%, #0B1245 40%, #1A2266 75%, #2A2F78 100%)` }} />

  <RingsCanvas />

  <div className="pointer-events-none absolute left-1/2 top-[-80px] h-[200px] w-[400px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[70px] sm:top-[-160px] sm:h-[320px] sm:w-[720px] sm:blur-[90px]" />
  <div className="pointer-events-none absolute bottom-[-80px] right-[-60px] h-[200px] w-[200px] rounded-full bg-[#A20508]/20 blur-[80px] sm:bottom-[-120px] sm:right-[-120px] sm:h-[340px] sm:w-[340px] sm:blur-[120px]" />

  <div className="relative mx-auto max-w-[1400px] text-center">
    <h1
      data-animate
      className="mb-4 text-[10px] font-medium uppercase tracking-[0.22em] text-white/80 sm:mb-5 sm:text-xs"
    >
      {t("badge")}
    </h1>
    <h2
      data-animate
      className="mx-auto max-w-[280px] text-[2rem] font-light leading-[1.1] tracking-[-0.03em] text-white sm:max-w-xl sm:text-[3rem] md:max-w-3xl md:text-[4rem] lg:max-w-5xl lg:text-[5.3rem] xl:max-w-[1300px] xl:text-[6.8rem]"
    >
      {t("heading")}
    </h2>
  </div>
</div>

      {/* Form */}
      <div className="mx-auto px-5 py-14 sm:px-8 md:px-12 md:py-16 lg:px-16 lg:py-20 xl:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-24">

          {/* Left info */}
          <div>
            <h3 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl">
              {t("formHeading")}
            </h3>
            <p className="mt-5 max-w-[430px] text-sm leading-relaxed text-black/80 sm:text-base">
              {t("formSubheading")}
            </p>
            <div className="mt-8 space-y-4 text-sm text-black/85 sm:text-base">
              <div className="flex items-start gap-3">
                <span className="mt-[2px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </span>
                <a href="mailto:info@happy2tech.fi" className="underline">info@happy2tech.fi</a>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-[2px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M6 4h3l2 5-2 1.5c1.2 2.3 2.8 3.9 5.1 5.1L15.7 13l5 2v3a2 2 0 0 1-2 2C10 20 4 14 4 5.3A1.3 1.3 0 0 1 5.3 4H6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </span>
                <a href="tel:+358407078000" className="underline">+358 407078000</a>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-[2px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </span>
                <p>{t("location")}</p>
              </div>
            </div>
          </div>

          {/* Right form */}
          <form onSubmit={formik.handleSubmit} className="w-full">

            {/* Name row */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FloatField
                label={t("firstName")}
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName ? formik.errors.firstName : undefined}
              />
              <FloatField
                label={t("lastName")}
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName ? formik.errors.lastName : undefined}
              />
              <FloatField
                label={t("email")}
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email ? formik.errors.email : undefined}
              />
              <FloatField
                label={t("phone")}
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone ? formik.errors.phone : undefined}
                required={false}
              />
            </div>

            {/* Topic */}
            <div className="mt-5 float-field">
              <select
                name="topic"
                value={formik.values.topic}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`float-select ${formik.values.topic ? "has-value" : ""} ${formik.touched.topic && formik.errors.topic ? "error" : ""}`}
              >
                <option value="" disabled />
                <option value="General Inquiry">{t("topicGeneral")}</option>
                <option value="Project Request">{t("topicProject")}</option>
                <option value="Partnership">{t("topicPartnership")}</option>
                <option value="Support">{t("topicSupport")}</option>
              </select>
              <label className="float-label">{t("topicLabel")}</label>
              {/* Chevron icon */}
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {formik.touched.topic && formik.errors.topic && (
                <p className="mt-1.5 text-xs text-[#B10D10]">{formik.errors.topic}</p>
              )}
            </div>

            {/* Role */}
            <div className="mt-7">
              <p className="mb-4 text-sm font-medium text-black">{t("roleLabel")}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {roleOptions.map((role) => (
                  <label
                    key={role}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200 text-sm ${
                      formik.values.role === role
                        ? "border-[#050A30] bg-[#050A30]/5 text-[#050A30] font-medium"
                        : "border-black/15 bg-white text-black/70 hover:border-black/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={formik.values.role === role}
                      onChange={() => formik.setFieldValue("role", role)}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        formik.values.role === role ? "border-[#050A30]" : "border-black/25"
                      }`}
                    >
                      {formik.values.role === role && (
                        <span className="w-2 h-2 rounded-full bg-[#050A30]" />
                      )}
                    </span>
                    {role}
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="mt-5 float-field">
              <textarea
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={6}
                className={`float-textarea ${formik.values.message ? "has-value" : ""} ${formik.touched.message && formik.errors.message ? "error" : ""}`}
              />
              <label className="float-label">{t("messagePlaceholder")}</label>
              {formik.touched.message && formik.errors.message && (
                <p className="mt-1.5 text-xs text-[#B10D10]">{formik.errors.message}</p>
              )}
            </div>

            {/* Agree */}
            <label className="mt-5 flex items-start gap-3 cursor-pointer group">
              <div
                onClick={() => formik.setFieldValue("agreed", !formik.values.agreed)}
                className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                  formik.values.agreed
                    ? "border-[#050A30] bg-[#050A30]"
                    : "border-black/25 bg-white group-hover:border-[#050A30]"
                }`}
              >
                {formik.values.agreed && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-black/70 leading-relaxed">{t("agreeText")}</span>
            </label>
            {formik.touched.agreed && formik.errors.agreed && (
              <p className="mt-1.5 text-xs text-[#B10D10]">{formik.errors.agreed as string}</p>
            )}

            {/* Status */}
            {formik.status?.message && (
              <div className={`mt-5 px-4 py-3 rounded-lg text-sm border ${
                formik.status.type === "success"
                  ? "border-green-500/30 bg-green-50 text-green-700"
                  : "border-red-500/30 bg-red-50 text-red-700"
              }`}>
                {formik.status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="mt-7 inline-flex h-[48px] rounded-lg items-center justify-center bg-[#B10D10] px-8 text-sm font-semibold text-white transition hover:bg-[#980b0b] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {formik.isSubmitting ? t("sending") : t("send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

type FloatFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  required?: boolean;
};

const FloatField = ({
  label, name, value, onChange, onBlur, error, type = "text", required = true,
}: FloatFieldProps) => (
  <div className="float-field">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      className={`float-input ${value ? "has-value" : ""} ${error ? "error" : ""}`}
    />
    <label className="float-label">{label}</label>
    {error && <p className="mt-1.5 text-xs text-[#B10D10]">{error}</p>}
  </div>
);

export default ContactSection;

const RingsCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let currentY = 0;
    let targetY = 0;
    let rafId: number;
    let isAnimating = false;

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      // Accumulate a small parallax offset based on scroll direction
      targetY += delta * 0.04;
      // Clamp so it doesn't drift too far
      targetY = Math.max(-18, Math.min(18, targetY));

      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      // Lerp toward target, then decay target back to 0
      currentY += (targetY - currentY) * 0.08;
      targetY += (0 - targetY) * 0.05;

      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(${currentY}px)`;
      }

      if (Math.abs(currentY) > 0.05 || Math.abs(targetY) > 0.05) {
        rafId = requestAnimationFrame(animate);
      } else {
        currentY = 0;
        targetY = 0;
        isAnimating = false;
        if (containerRef.current) {
          containerRef.current.style.transform = "translateY(0px)";
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const rings = [
    {
      size: 340,
      color: "rgba(177,13,16,0.55)",
      dotColor: "#B10D10",
      duration: "0s", // STOPPED — no continuous rotation
      direction: "normal",
      dash: "18 10",
      offsetX: 48,
      offsetY: 52,
    },
    {
      size: 520,
      color: "rgba(38,72,255,0.4)",
      dotColor: "#2648ff",
      duration: "0s",
      direction: "reverse",
      dash: "28 14",
      offsetX: 52,
      offsetY: 48,
    },
    {
      size: 720,
      color: "rgba(255,255,255,0.1)",
      dotColor: "rgba(255,255,255,0.5)",
      duration: "0s",
      direction: "normal",
      dash: "6 20",
      offsetX: 50,
      offsetY: 50,
    },
    {
      size: 940,
      color: "rgba(251,191,36,0.25)",
      dotColor: "#fbbf24",
      duration: "0s",
      direction: "reverse",
      dash: "40 18",
      offsetX: 47,
      offsetY: 53,
    },
    {
      size: 1160,
      color: "rgba(177,13,16,0.12)",
      dotColor: "transparent",
      duration: "0s",
      direction: "normal",
      dash: "12 30",
      offsetX: 51,
      offsetY: 49,
    },
  ];

  return (
    <>
      <style>{`
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
          overflow: visible;
        }
      `}</style>

      <div ref={containerRef} className="rings-container">
        <svg
          className="ring-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          {rings.map((ring, i) => {
            const r = ring.size / 20;
            const cx = ring.offsetX;
            const cy = ring.offsetY;

            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth="0.18"
                  strokeDasharray={ring.dash}
                />
                {ring.dotColor !== "transparent" && (
                  <circle
                    cx={cx}
                    cy={cy - r}
                    r="0.45"
                    fill={ring.dotColor}
                    opacity="0.85"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </>
  );
};