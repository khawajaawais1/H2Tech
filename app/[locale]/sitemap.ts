import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://happy2tech.fi";

  return [
    {
      url: base,
      lastModified: new Date(),
    },
    {
      url: `${base}/services`,
      lastModified: new Date(),
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
    },
  ];
}