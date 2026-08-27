import { MetadataRoute } from "next";
import { getAllItems } from "@/lib/api";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const langs = ["en", "zh"];
  const collections = ["experience", "project", "writing"] as const;
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const lang of langs) {
    entries.push({
      url: `${SITE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });
  }

  for (const lang of langs) {
    entries.push({
      url: `${SITE_URL}/${lang}/paper/artistic-tales`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Collection pages
  for (const lang of langs) {
    for (const collection of collections) {
      const items = getAllItems(collection, lang);
      for (const item of items) {
        entries.push({
          url: `${SITE_URL}/${lang}/${collection}/${item.slug}`,
          lastModified: new Date(item.lastModified || item.date),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }
  }

  return entries;
}
