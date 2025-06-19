import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://spy-en.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://spy-en.vercel.app/step1",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://spy-en.vercel.app/step2",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://spy-en.vercel.app/step3",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ]
}
