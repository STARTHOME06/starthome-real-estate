import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { cities, properties, seoServices, slugify } from "@/lib/data";

const baseUrl = "https://www.starthome.it";

function url(path: string) {
  return `${baseUrl}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/immobili-in-vendita",
    "/immobili-in-affitto",
    "/valutazione",
    "/servizi",
    "/chi-siamo",
    "/blog",
    "/contatti",
    "/vendere-casa",
    "/lavora-con-noi",
    "/privacy",
  ].map((path) => ({
    url: url(path),
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const propertyPages: MetadataRoute.Sitemap = properties.map((property) => ({
    url: url(`/immobili/${property.slug}`),
    lastModified: property.updatedAt ? new Date(property.updatedAt) : now,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const localSeoPages: MetadataRoute.Sitemap = seoServices.flatMap((service) =>
    cities.map((city) => ({
      url: url(`/${service.slug}/${slugify(city)}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  );

  const pricePages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: url(`/prezzi-case/${slugify(city)}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...propertyPages,
    ...blogPages,
    ...localSeoPages,
    ...pricePages,
  ];
}
