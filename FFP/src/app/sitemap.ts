import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://futureforwardpartners.com";

  const staticPages = [
    "",
    "/services",
    "/talent",
    "/case-studies",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const caseStudyPages = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...caseStudyPages];
}
