"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { searchIndex } from "@/src/data/searchIndex";
import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl"; 

const NAV_LINKS = [
  { key:"home", href: "/", type: "route" },
  { key:"services", href: "/services", type: "route" },
  { key:"vision", href: "/vision", type: "route" },
  { key:"contact", href: "/contact", type: "route" },
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fi", label: "Finnish" },
];

const Navbar = () => {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [langOpen, setLangOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setMobileOpen(false);
      }

      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }

      if (langRef.current && !langRef.current.contains(target)) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
    }
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchValue("");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const query = searchValue.trim().toLowerCase();
  if (!query) return;

  const match = searchIndex.find((item) =>
    item.keywords.some((keyword) =>
      keyword.toLowerCase().includes(query)
    )
  );

  if (!match) {
    alert("No matching section found.");
    return;
  }

  const [targetPath, hash] = match.path.split("#");

  setSearchOpen(false);
  setSearchValue("");

  const currentPath = pathname || "/";

  if (currentPath === targetPath) {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else {
    router.push(match.path);
  }
};

const changeLanguage = (newLocale: string) => {
  const cleanPath = pathname.replace(/^\/(en|fi)(?=\/|$)/, '') || '/';
  setLangOpen(false);
  router.replace(`/${newLocale.toLowerCase()}${cleanPath}`, { scroll: false });
};

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050A30] backdrop-blur">
        <div className="mx-auto flex h-16 items-center justify-between px-5 md:h-20 md:px-10 lg:px-20">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="relative h-14 w-14 md:h-20 md:w-20">
              <Image
                src="/logo.png"
                alt="H2Tech"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden items-center md:flex">
            <nav className="flex items-center text-white">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={`/${locale}${l.href}`}
                  className="px-6 text-sm font-normal text-white/90 transition-colors hover:text-white lg:text-[15px]"
                >
                  {t(l.key)}
                </Link>
              ))}

              {/* Search area */}
              <div
                ref={searchRef}
                className="ml-4 flex h-20 items-center"
              >
                {!searchOpen ? (
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    aria-label="Open search"
                    className="flex h-10 w-10 items-center justify-center text-white transition hover:text-white/80"
                  >
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="7"
                        strokeWidth="2"
                      />
                      <path
                        d="M20 20l-3.5-3.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <form
                    onSubmit={handleSearchSubmit}
                    className="relative flex items-center"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search..."
                      className="h-11 w-[240px] border border-white/30 bg-transparent px-4 pr-11 text-sm text-white outline-none placeholder:text-white/50"
                    />
                    <button
                      type="button"
                      onClick={closeSearch}
                      aria-label="Close search"
                      className="absolute right-3 flex h-6 w-6 items-center justify-center text-white/80 transition hover:text-white"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </form>
                )}
              </div>

              <div
                ref={langRef}
                className="relative flex h-20 items-center  pl-8"
              >
                <button
                  type="button"
                  onClick={() => setLangOpen((v) => !v)}
                  aria-label="Change language"
                  className="flex items-center gap-2 text-white transition hover:text-white/80"
                >
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path
                      d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="text-sm">{locale}</span>
                </button>

                {langOpen && (
                  <div className="absolute right-0 top-[calc(100%_-_8px)] w-44 border border-white/10 bg-[#0B1040] p-1.5 shadow-2xl">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          changeLanguage(lang.code);
                          setLangOpen(false);
                        }}
                        className={`block w-full px-3 py-2 text-left text-sm transition ${
                          locale === lang.code
                            ? "bg-white/10 text-white"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md transition-colors hover:bg-white/10 md:hidden"
          >
            <span
              className="block h-[2px] w-6 origin-center rounded-full bg-white transition-all duration-300"
              style={
                mobileOpen ? { transform: "translateY(7px) rotate(45deg)" } : {}
              }
            />
            <span
              className="block h-[2px] w-6 rounded-full bg-white transition-all duration-400"
              style={mobileOpen ? { opacity: 0, transform: "scaleX(0)" } : {}}
            />
            <span
              className="block h-[2px] w-6 origin-center rounded-full bg-white transition-all duration-300"
              style={
                mobileOpen
                  ? { transform: "translateY(-7px) rotate(-45deg)" }
                  : {}
              }
            />
          </button>
        </div>
      </header>

      {/* Mobile backdrop */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 md:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={closeAll}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        ref={menuRef}
        className={[
          "fixed right-0 top-0 z-50 h-full w-72 bg-[#080D38] shadow-2xl md:hidden",
          "flex flex-col transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link href="/" onClick={closeAll}>
            <div className="relative h-12 w-12">
              <Image
                src="/logo.png"
                alt="H2Tech"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <button
            type="button"
            onClick={closeAll}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeAll}
              className="block rounded-lg px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t(l.key)}
            </Link>
          ))}

          {/* Mobile search */}
          <div className="mt-4 border-t border-white/10 pt-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="h-11 w-full border border-white/30 bg-transparent px-4 pr-11 text-sm text-white outline-none placeholder:text-white/50"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => setSearchValue("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </form>
          </div>

          {/* Mobile language */}
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="mb-3 px-1 text-sm text-white/70">Language</p>
            <div className="flex flex-col gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                  className={`rounded-lg px-4 py-3 text-left text-sm transition ${
                    locale === lang.code
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;