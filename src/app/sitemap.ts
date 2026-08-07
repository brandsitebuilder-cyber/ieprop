import { MetadataRoute } from "next";

const BASE = "https://ieprop.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/properties`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/agents`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/calculators`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/properties?status=sold&type=sale`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  return pages;
}
