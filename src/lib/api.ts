import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const contentDirectory = join(process.cwd(), "content");
const SAFE_SLUG = /^[a-z0-9][a-z0-9-]*$/;

const LANGUAGES = ["en", "zh"] as const;

export const CONTENT_COLLECTIONS = [
  "creation",
  "experience",
  "project",
  "writing",
] as const;

export type ContentCollection = (typeof CONTENT_COLLECTIONS)[number];

// Collections that support both shared (content/{collection}/) and language-specific (content/{lang}/{collection}/) files
const hybridCollections = new Set<ContentCollection>(["creation"]);

function isLanguage(value: string): value is (typeof LANGUAGES)[number] {
  return LANGUAGES.includes(value as (typeof LANGUAGES)[number]);
}

function getMarkdownSlugs(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name.replace(/\.md$/, ""))
    .filter((slug) => SAFE_SLUG.test(slug))
    .sort();
}

function normalizeDate(value: unknown, fallback: Date): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }

  if (typeof value === "string" && !Number.isNaN(Date.parse(value))) {
    return value;
  }

  return fallback.toISOString();
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export function getSlugs(collection: ContentCollection, lang: string): string[] {
  if (!isLanguage(lang)) return [];

  const langDir = join(contentDirectory, lang, collection);
  const sharedDir = join(contentDirectory, collection);

  if (hybridCollections.has(collection)) {
    const langSlugs = getMarkdownSlugs(langDir);
    const sharedSlugs = getMarkdownSlugs(sharedDir);
    // Lang-specific files take priority over shared ones with the same slug
    const langSet = new Set(langSlugs);
    const mergedSlugs = [...langSlugs, ...sharedSlugs.filter(s => !langSet.has(s))];
    return mergedSlugs;
  }

  const dir = join(contentDirectory, lang, collection);
  return getMarkdownSlugs(dir);
}

export function getItemBySlug(collection: ContentCollection, slug: string, lang: string): Post | null {
  const realSlug = slug.replace(/\.md$/, "");
  if (!isLanguage(lang) || !SAFE_SLUG.test(realSlug)) return null;

  let fullPath: string;
  if (hybridCollections.has(collection)) {
    const langPath = join(contentDirectory, lang, collection, `${realSlug}.md`);
    const sharedPath = join(contentDirectory, collection, `${realSlug}.md`);
    fullPath = fs.existsSync(langPath) ? langPath : sharedPath;
  } else {
    fullPath = join(contentDirectory, lang, collection, `${realSlug}.md`);
  }
  
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const lastModified = fs.statSync(fullPath).mtime;

  if (data.personalSite !== true) return null;

  const coverImage = asString(data.coverImage);
  const ogImageUrl =
    typeof data.ogImage?.url === "string" ? data.ogImage.url : coverImage;

  const post: Post = {
    slug: realSlug,
    title: asString(data.title, "Untitled"),
    date: normalizeDate(data.date, lastModified),
    coverImage,
    excerpt: asString(data.excerpt),
    ogImage: { url: ogImageUrl },
    content,
    preview: data.preview === true,
    intro: asString(data.intro),
    location: asString(data.location),
    dateRange: asString(data.dateRange),
    type: asString(data.type),
    sorting: typeof data.sorting === "number" ? data.sorting : 0,
    area: asStringArray(data.area),
    skill: asStringArray(data.skill),
    favicon: asString(data.favicon),
    firstImage: (() => {
      const match = content.match(/!\[.*?\]\((.*?)\)/);
      return coverImage || match?.[1] || "";
    })(),
    lastModified: lastModified.toISOString(),
  };

  return post;
}

export function getAllItems(collection: ContentCollection, lang: string): Post[] {
  const slugs = getSlugs(collection, lang);
  const posts = slugs
    .map((slug) => getItemBySlug(collection, slug, lang))
    .filter((post): post is Post => post !== null)
    // Sort posts by date in descending order
    .sort((post1, post2) => {
      const dateDifference = Date.parse(post2.date) - Date.parse(post1.date);
      return dateDifference || post1.slug.localeCompare(post2.slug);
    });
  return posts;
}
