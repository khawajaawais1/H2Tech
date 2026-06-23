import type { ReactNode } from "react";

export type QuoteVariant = "tailored" | "enterprise";

export type PricingTier = {
  id: string;
  featured?: boolean;
  priceFrom?: string;
  quote?: { variant: QuoteVariant };
};

export type ServiceCategory = {
  id: "websites" | "mobile" | "webapps" | "chatbots";
  icon: ReactNode;
  tiers: PricingTier[];
};

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 2,
};

export const categories: ServiceCategory[] = [
  {
    id: "websites",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
    tiers: [
      { id: "tier1", priceFrom: "€99" },
      { id: "tier2", featured: true, priceFrom: "€200" },
      { id: "tier3", priceFrom: "€500" },
      { id: "tier4", priceFrom: "€700" },
    ],
  },
  {
    id: "mobile",
    icon: (
      <svg {...iconProps}>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
    tiers: [
      { id: "tier1", priceFrom: "€999" },
      { id: "tier2", featured: true, quote: { variant: "tailored" } },
      { id: "tier3", quote: { variant: "tailored" } },
      { id: "tier4", quote: { variant: "enterprise" } },
    ],
  },
  {
    id: "webapps",
    icon: (
      <svg {...iconProps}>
        <path d="M3 6a3 3 0 013-3h12a3 3 0 013 3v9a3 3 0 01-3 3H6a3 3 0 01-3-3z" />
        <path d="M8 21h8M12 18v3" />
      </svg>
    ),
    tiers: [
      { id: "tier1", priceFrom: "€800" },
      { id: "tier2", featured: true, quote: { variant: "tailored" } },
      { id: "tier3", quote: { variant: "tailored" } },
      { id: "tier4", quote: { variant: "enterprise" } },
    ],
  },
  {
    id: "chatbots",
    icon: (
      <svg {...iconProps}>
        <path d="M21 12a8 8 0 11-16 0 8 8 0 0116 0z" />
        <path d="M9 10h.01M15 10h.01M9 15c1 1 2 1 3 1s2 0 3-1" />
      </svg>
    ),
    tiers: [
      { id: "tier1", priceFrom: "€299" },
      { id: "tier2", featured: true, priceFrom: "€700" },
      { id: "tier3", quote: { variant: "tailored" } },
      { id: "tier4", quote: { variant: "enterprise" } },
    ],
  },
];
