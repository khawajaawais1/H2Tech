import { useId } from "react";

/** Friendly robot mascot used for the chatbot launcher, header and message avatars. */
const BotAvatar = ({ className = "" }: { className?: string }) => {
  const id = useId().replace(/:/g, "");
  const shell = `bot-shell-${id}`;
  const visor = `bot-visor-${id}`;
  const blue = `bot-blue-${id}`;
  const glow = `bot-glow-${id}`;

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={shell} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dbe6f5" />
        </linearGradient>
        <linearGradient id={visor} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b2a52" />
          <stop offset="1" stopColor="#070d24" />
        </linearGradient>
        <linearGradient id={blue} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fd3ff" />
          <stop offset="1" stopColor="#1e8fe0" />
        </linearGradient>
        <filter id={glow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Antenna */}
      <rect x="57.5" y="12" width="5" height="14" rx="2.5" fill="#c9d6ea" />
      <circle cx="60" cy="11" r="7" fill={`url(#${blue})`} />
      <circle cx="57.6" cy="8.6" r="2.2" fill="#fff" opacity=".8" />

      {/* Headphones */}
      <rect x="6" y="46" width="18" height="30" rx="9" fill={`url(#${blue})`} />
      <rect x="96" y="46" width="18" height="30" rx="9" fill={`url(#${blue})`} />

      {/* Helmet */}
      <rect x="15" y="22" width="90" height="80" rx="36" fill={`url(#${shell})`} />
      <path d="M30 36c8-8 20-11 30-11s22 3 30 11" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".9" />

      {/* Visor */}
      <rect x="25" y="38" width="70" height="50" rx="24" fill={`url(#${visor})`} />
      <path d="M34 48c4-5 10-7 16-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".25" />

      {/* Face */}
      <g filter={`url(#${glow})`} stroke="#6ee7ff" strokeWidth="4.5" strokeLinecap="round" fill="none">
        <path d="M40 62c3.5-6 10.5-6 14 0" />
        <path d="M66 62c3.5-6 10.5-6 14 0" />
        <path d="M52 72c4.5 4.5 11.5 4.5 16 0" />
      </g>

      {/* Microphone */}
      <path d="M15 70c0 12 8 20 22 20" stroke="#1e8fe0" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <circle cx="39" cy="90" r="4.5" fill={`url(#${blue})`} />
    </svg>
  );
};

export default BotAvatar;
