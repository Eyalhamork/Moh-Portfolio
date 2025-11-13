import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mohkromah.com";

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];

  // Add project routes
  const projectIds = [
    "liberiafix",
    "silenvia-ai-therapy",
    "sibling-craft-freelance",
    "salone-haven-real-estate",
    "crownprince",
  ];

  const projectRoutes = projectIds.map((id) => ({
    url: `${baseUrl}/projects/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes];
}
