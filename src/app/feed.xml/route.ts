import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/constants";

export async function GET() {
  const posts = await getAllPosts();

  const feedItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${post.published_at ? new Date(post.published_at).toUTCString() : ""}</pubDate>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>${siteConfig.language}</language>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${feedItems}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
