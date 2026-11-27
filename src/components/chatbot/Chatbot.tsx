"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  START_SUGGESTIONS,
  getIntent,
  matchIntent,
  type ChatIntent,
  type ChatLocale,
} from "@/src/data/chatbotIntents";
import BotAvatar from "./BotAvatar";

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  link?: { href: string; label: string };
  /** Renders the email-support form under this bot message. */
  form?: boolean;
};

type FormState = { name: string; email: string; message: string };
type SendState = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Chatbot = () => {
  const t = useTranslations("chatbot");
  const locale = (useLocale() === "fi" ? "fi" : "en") as ChatLocale;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(START_SUGGESTIONS);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [formError, setFormError] = useState("");
  const [sendState, setSendState] = useState<SendState>("idle");
  const [unread, setUnread] = useState(false);

  const nextId = useRef(1);
  const lastUnanswered = useRef("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const push = (msg: Omit<Message, "id">) =>
    setMessages((prev) => [...prev, { ...msg, id: nextId.current++ }]);

  // Greet on first open, and nudge with a dot on the launcher until then.
  useEffect(() => {
    const timer = setTimeout(() => setUnread(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    setUnread(false);
    if (messages.length === 0) push({ from: "bot", text: t("welcome") });
    if (window.matchMedia("(min-width: 640px)").matches) setTimeout(() => inputRef.current?.focus(), 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
  }, []);

  useEffect(() => {
    if (!open || !window.matchMedia("(max-width: 639px)").matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openSupportForm = (text: string) => {
    setForm((f) => ({ ...f, message: f.message || lastUnanswered.current }));
    setFormError("");
    setSendState("idle");
    push({ from: "bot", text, form: true });
    setSuggestions([]);
  };

  const respond = (intent: ChatIntent | null, userText: string) => {
    setTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      setTyping(false);

      if (!intent) {
        lastUnanswered.current = userText;
        push({ from: "bot", text: t("fallback") });
        setSuggestions(["human", ...START_SUGGESTIONS.filter((s) => s !== "human")]);
        return;
      }

      if (intent.escalate) {
        openSupportForm(intent.reply[locale]);
        return;
      }

      push({
        from: "bot",
        text: intent.reply[locale],
        link: intent.link && { href: `/${locale}${intent.link.href}`, label: intent.link.label[locale] },
      });
      setSuggestions(intent.next ?? START_SUGGESTIONS);
    }, 550);
  };

  const sendText = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    push({ from: "user", text });
    setInput("");
    respond(matchIntent(text, locale), text);
  };

  const pickSuggestion = (id: string) => {
    const intent = getIntent(id);
    if (!intent || typing) return;
    push({ from: "user", text: intent.label[locale] });
    respond(intent, intent.label[locale]);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (name.length < 2) return setFormError(t("errorName"));
    if (!EMAIL_RE.test(email)) return setFormError(t("errorEmail"));
    if (message.length < 2) return setFormError(t("errorMessage"));
    setFormError("");
    setSendState("sending");

    const transcript = messages
      .filter((m) => !m.form)
      .map((m) => `${m.from === "user" ? "Visitor" : "Bot"}: ${m.text}`)
      .join("\n");
    const [firstName, ...rest] = name.split(/\s+/);

    try {
      const res = await fetch(`/${locale}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(" "),
          email,
          topic: "Chatbot",
          source: "chatbot",
          message: `${message}\n\n--- Chat transcript ---\n${transcript}`,
          agreed: true,
        }),
      });
      if (!res.ok) throw new Error();
      setSendState("sent");
      push({ from: "bot", text: t("sent", { email }) });
      setForm({ name: "", email: "", message: "" });
      lastUnanswered.current = "";
      setSuggestions(START_SUGGESTIONS.filter((s) => s !== "human"));
    } catch {
      setSendState("error");
      setFormError(t("sendError"));
    }
  };

  const restart = () => {
    setMessages([{ id: nextId.current++, from: "bot", text: t("welcome") }]);
    setSuggestions(START_SUGGESTIONS);
    setSendState("idle");
    setFormError("");
    lastUnanswered.current = "";
  };

  const activeFormId = [...messages].reverse().find((m) => m.form)?.id;

  return (
    <>
      <style>{`
        @keyframes h2t-pop { from { opacity: 0; transform: translateY(16px) scale(.96); } to { opacity: 1; transform: none; } }
        @keyframes h2t-msg { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes h2t-ring { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(1.55); opacity: 0; } }
        @keyframes h2t-dot { 0%, 80%, 100% { opacity: .25; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }
        .h2t-panel { animation: h2t-pop .28s cubic-bezier(.2,.8,.2,1); }
        .h2t-msg { animation: h2t-msg .25s ease-out; }
        .h2t-ring { animation: h2t-ring 2.2s ease-out infinite; }
        .h2t-typing span { animation: h2t-dot 1.2s infinite; }
        .h2t-typing span:nth-child(2) { animation-delay: .15s; }
        .h2t-typing span:nth-child(3) { animation-delay: .3s; }
      `}</style>

      {open && (
        <div
          role="dialog"
          aria-label={t("title")}
          className="h2t-panel fixed inset-0 z-[70] flex h-[100dvh] flex-col overflow-hidden bg-white sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[600px] sm:max-h-[calc(100dvh-7.5rem)] sm:w-[380px] sm:rounded-2xl sm:border sm:border-black/10 sm:shadow-[0_24px_60px_-12px_rgba(5,10,48,0.45)]"
        >
          {/* Header */}
          <div className="relative flex shrink-0 items-center gap-3 overflow-hidden bg-[#050A30] px-4 pb-3.5 pt-[max(0.875rem,env(safe-area-inset-top))] text-white sm:pt-3.5">
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(circle at 15% 20%, rgba(38,72,255,0.28) 0%, transparent 50%), radial-gradient(circle at 90% 90%, rgba(177,13,16,0.35) 0%, transparent 55%)" }}
            />
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f3ff] ring-2 ring-[#B10D10]/70">
              <BotAvatar className="h-9 w-9" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#050A30] bg-emerald-400" />
            </div>
            <div className="relative min-w-0 flex-1">
              <p className="text-[15px] font-bold leading-tight">{t("title")}</p>
              <p className="text-xs text-white/65">{t("subtitle")}</p>
            </div>
            <button
              type="button"
              onClick={restart}
              aria-label={t("restart")}
              title={t("restart")}
              className="relative rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="relative rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#f5f6fa] px-4 py-4" aria-live="polite">
            {messages.map((m) =>
              m.from === "user" ? (
                <div key={m.id} className="h2t-msg flex justify-end">
                  <p className="max-w-[85%] whitespace-pre-line rounded-2xl sm:max-w-[80%] rounded-br-md bg-[#B10D10] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="h2t-msg flex items-end gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8f3ff]">
                    <BotAvatar className="h-6 w-6" />
                  </div>
                  <div className="max-w-[82%] rounded-2xl rounded-bl-md border border-black/5 bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed text-[#0D1235] shadow-sm">
                    <p className="whitespace-pre-line">{m.text}</p>
                    {m.link && (
                      <Link
                        href={m.link.href}
                        className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-[#B10D10] hover:underline"
                      >
                        {m.link.label}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    )}
                    {m.form && m.id === activeFormId && sendState !== "sent" && (
                      <form onSubmit={submitForm} className="mt-3 space-y-2">
                        <input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder={t("namePlaceholder")}
                          autoComplete="name"
                          className="h-11 w-full rounded-lg border border-black/15 px-3 text-base sm:h-10 sm:text-[13px] outline-none focus:border-[#050A30]"
                        />
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder={t("emailPlaceholder")}
                          autoComplete="email"
                          className="h-11 w-full rounded-lg border border-black/15 px-3 text-base sm:h-10 sm:text-[13px] outline-none focus:border-[#050A30]"
                        />
                        <textarea
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder={t("messagePlaceholder")}
                          rows={3}
                          className="w-full resize-none rounded-lg border border-black/15 px-3 py-2 text-base sm:text-[13px] outline-none focus:border-[#050A30]"
                        />
                        {formError && <p className="text-xs text-[#B10D10]">{formError}</p>}
                        <button
                          type="submit"
                          disabled={sendState === "sending"}
                          className="h-11 w-full rounded-lg bg-[#050A30] text-sm sm:h-10 sm:text-[13px] font-semibold text-white transition hover:bg-[#0B1245] disabled:opacity-60"
                        >
                          {sendState === "sending" ? t("sending") : t("send")}
                        </button>
                        <p className="text-[11px] leading-snug text-black/45">{t("consent")}</p>
                      </form>
                    )}
                  </div>
                </div>
              )
            )}

            {typing && (
              <div className="flex items-end gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8f3ff]">
                  <BotAvatar className="h-6 w-6" />
                </div>
                <div className="h2t-typing flex gap-1 rounded-2xl rounded-bl-md border border-black/5 bg-white px-4 py-3.5 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#050A30]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#050A30]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#050A30]" />
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && !typing && (
            <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-black/5 bg-white px-3 py-2.5 [scrollbar-width:none]">
              {suggestions.map((id) => {
                const intent = getIntent(id);
                if (!intent) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => pickSuggestion(id)}
                    className={`shrink-0 rounded-full border px-3.5 py-2 text-[13px] sm:px-3 sm:py-1.5 sm:text-[12.5px] font-medium transition ${
                      id === "human"
                        ? "border-[#B10D10]/30 bg-[#B10D10]/5 text-[#B10D10] hover:bg-[#B10D10]/10"
                        : "border-[#050A30]/15 text-[#050A30] hover:border-[#050A30]/40 hover:bg-[#050A30]/5"
                    }`}
                  >
                    {intent.label[locale]}
                  </button>
                );
              })}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendText(input);
            }}
            className="flex shrink-0 items-center gap-2 border-t border-black/10 bg-white px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:pb-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("inputPlaceholder")}
              maxLength={500}
              aria-label={t("inputPlaceholder")}
              className="h-11 min-w-0 flex-1 rounded-full bg-[#f1f2f6] px-4 text-base sm:h-10 sm:text-[13.5px] text-[#0D1235] outline-none placeholder:text-black/40 focus:ring-2 focus:ring-[#050A30]/15"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label={t("sendMessage")}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#B10D10] sm:h-10 sm:w-10 text-white transition hover:bg-[#980b0b] disabled:opacity-40"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t("close") : t("open")}
        aria-expanded={open}
        className={`group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 h-14 w-14 items-center justify-center rounded-full bg-[#050A30] shadow-[0_12px_30px_-6px_rgba(5,10,48,0.6)] ring-2 ring-[#B10D10] transition hover:scale-105 sm:bottom-6 sm:right-6 sm:flex sm:h-[60px] sm:w-[60px] ${open ? "hidden" : "flex"}`}
      >
        {!open && <span className="h2t-ring pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#B10D10]" />}
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.4} strokeLinecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        ) : (
          <>
            <BotAvatar className="h-11 w-11 drop-shadow-[0_0_8px_rgba(110,231,255,0.35)] transition-transform group-hover:-rotate-6 sm:h-12 sm:w-12" />
            <span className="absolute -bottom-0.5 -left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#B10D10] shadow ring-2 ring-white">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
              </svg>
            </span>
            {unread && <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#050A30]" />}
          </>
        )}
      </button>
    </>
  );
};

export default Chatbot;
