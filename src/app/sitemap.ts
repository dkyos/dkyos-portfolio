import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/posts";
import { siteConfig } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();

  const blogPosts = slugs.map((slug) => ({
    url: `${siteConfig.url}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...blogPosts,
  ];
}
