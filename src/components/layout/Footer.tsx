"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="w-full text-white bg-[#050A30]">
      <div className="w-full px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 lg:gap-12 xl:gap-16">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative h-36 w-36 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Happy2Tech logo"
                  fill
                  className="object-center"
                  priority
                />
              </div>
            </div>
            <p className="text-sm text-white/90 mb-5">
              {t("newsletterText")}
            </p>
            {/* <form
              className="flex flex-col sm:flex-row gap-3 mb-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="flex-1 h-11 px-4 text-sm text-white placeholder:text-white/50 bg-transparent border border-white/30 focus:border-white/60 focus:outline-none"
              />
              <button
                type="submit"
                className="h-11 px-7 shrink-0 text-sm font-semibold text-white bg-[#A20508] hover:bg-[#8a0406] transition-colors"
              >
                {t("subscribe")}
              </button>
            </form> */}

            <p className="text-[11px] text-white/50 leading-relaxed">
              {t("privacyText")}{" "}
              <Link href="/docs/Privacy-Policy.docx" className="underline hover:text-white">
                {t("privacyLink")}
              </Link>{" "}
              {t("privacyText2")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 lg:gap-8 xl:gap-12">
            <div />

            <div>
              <h3 className="text-sm font-semibold text-white mb-5">
                {t("productsHeading")}
              </h3>
              <ul className="space-y-3.5">
                <li>
                  <Link href={`/${locale}/services`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {t("linkServices")}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/#about`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {t("linkAbout")}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/vision`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {t("linkVision")}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {t("linkContact")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-5">
                {t("followHeading")}
              </h3>
              <ul className="space-y-3.5">
                <li>
                  <Link href="https://www.linkedin.com/in/happy-2tech-b471413b6/" target="_blank" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                    <IconLinkedIn /> LinkedIn
                  </Link>
                </li>
                 <li>
                  <Link href="https://www.instagram.com/happy2tech?igsh=ejdkYW53YXFudWRp" target="_blank" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                    <IconInstagram /> Instagram
                  </Link>
                </li>
                <li>
                  <Link href="https://www.youtube.com/@Happy2Tech" target="_blank" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                    <IconYoutube /> YouTube
                  </Link>
                </li>
                <li>
                  <Link href="https://www.facebook.com/" className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                    <IconFacebook /> Facebook
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 mb-6 border-t border-white/20" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 text-xs text-white/60">
          <div>{t("copyright")}</div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="/docs/Privacy-Policy.docx" download className="hover:text-white underline underline-offset-2 transition-colors">
              {t("footerPrivacy")}
            </a>
            <a href="/docs/Terms-and-Conditions.docx" download className="hover:text-white underline underline-offset-2 transition-colors">
              {t("footerTerms")}
            </a>
            <a href="/docs/Cookies-Policy.docx" download className="hover:text-white underline underline-offset-2 transition-colors">
              {t("footerCookies")}
            </a>
            <a href="/docs/GDPR-Protection-Statement.docx" download className="hover:text-white underline underline-offset-2 transition-colors">
              {t("footerGdpr")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 8.5V7.2c0-1 .7-1.2 1.2-1.2H17V3h-2.5C12.5 3 11 4.6 11 7v1.5H9v3h2V21h3v-9.5h2.4l.6-3H14z" fill="currentColor" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" stroke="currentColor" strokeWidth="2" />
      <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17.8 3H21l-7 8 8 10h-6.2l-4.9-6.2L5.8 21H3l7.6-8.7L3 3h6.3l4.4 5.6L17.8 3z" fill="currentColor" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 9H3.8v12h2.7V9zM5.15 3.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM21 21h-2.7v-6.1c0-1.46-.03-3.34-2.03-3.34-2.03 0-2.34 1.59-2.34 3.23V21h-2.7V9h2.6v1.64h.04c.36-.68 1.25-1.4 2.58-1.4 2.76 0 3.27 1.82 3.27 4.19V21z" fill="currentColor" />
    </svg>
  );
}

function IconYoutube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21.6 7.2s-.2-1.4-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.8 4 12 4 12 4h0s-3.8 0-6.7.2c-.4.1-1.3.1-2.1.9-.6.7-.8 2.1-.8 2.1S2 8.9 2 10.6v1.6c0 1.7.4 3.4.4 3.4s.2 1.4.8 2.1c.8.8 1.9.8 2.4.9 1.7.2 6.4.2 6.4.2s3.8 0 6.7-.2c.4-.1 1.3-.1 2.1-.9.6-.7.8-2.1.8-2.1s.4-1.7.4-3.4v-1.6c0-1.7-.4-3.4-.4-3.4z" fill="currentColor" />
      <path d="M10 9.5v5l5-2.5-5-2.5z" fill="#050A30" />
    </svg>
  );
}