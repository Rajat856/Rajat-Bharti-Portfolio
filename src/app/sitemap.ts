import type { MetadataRoute } from "next";
import { projects } from "@/lib/data/projects";
import { posts } from "@/lib/data/posts";
import { graphics } from "@/lib/data/graphics";
import { navItems } from "@/lib/nav";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = navItems.map((item) => ({
    url: absoluteUrl(item.href),
    lastModified: now,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : ["/portfolio", "/services"].includes(item.href) ? 0.9 : 0.7,
    // The portfolio page carries every graphic and video — list them for image/video search.
    ...(item.href === "/portfolio"
      ? {
          images: graphics.map((g) => absoluteUrl(g.thumb)),
          videos: graphics
            .filter((g) => g.format === "video")
            .map((g) => ({
              title: g.title,
              thumbnail_loc: absoluteUrl(g.thumb),
              description: (g.description ?? g.title).slice(0, 2000),
              content_loc: absoluteUrl(g.src),
            })),
        }
      : {}),
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => {
    const imgs = [p.cover.image, p.homepageShot].filter(Boolean) as string[];
    return {
      url: absoluteUrl(`/portfolio/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: imgs.map((i) => absoluteUrl(i)),
    };
  });

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.dateISO),
    changeFrequency: "yearly",
    priority: 0.6,
    ...(p.cover.image ? { images: [absoluteUrl(p.cover.image)] } : {}),
  }));

  return [...pages, ...projectPages, ...postPages];
}
