import type { Metadata } from "next";
import { profile } from "./resume";

export const siteUrl =
  // TODO: replace with Huzaifa's real portfolio domain when available.
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://huzaifakhalid.com";

const defaultDescription =
  "Full Stack Developer and Cybersecurity Specialist based in Canada. React, Next.js, Node.js, Network Security. Open to opportunities in GTA, remote Canada, and remote USA.";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Full Stack & Cybersecurity`,
    template: `%s - ${profile.name}`,
  },
  description: defaultDescription,
  keywords: [
    "Huzaifa Khalid",
    "Full Stack Developer",
    "Cybersecurity Specialist",
    "Cybersecurity Analyst",
    "Software Engineer Canada",
    "React Developer",
    "Node.js Developer",
    "NestJS",
    "SOC Analyst",
    "Incident Response",
    "Web Security",
    "Toronto",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  // Icons are auto-wired from app/icon.svg and app/apple-icon.tsx (file-based metadata).
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: profile.name,
    title: `${profile.name} — Full Stack & Cybersecurity`,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Full Stack & Cybersecurity`,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export function pageMetadata({
  title,
  description,
  path = "/",
  ogType = "website",
  article,
  keywords,
}: {
  title: string;
  description?: string;
  path?: string;
  ogType?: "website" | "article";
  article?: {
    publishedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  keywords?: string[];
}): Metadata {
  const desc = description ?? defaultDescription;
  return {
    title,
    description: desc,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      locale: "en_US",
      siteName: profile.name,
      title: `${title} - ${profile.name}`,
      description: desc,
      url: `${siteUrl}${path}`,
      ...(ogType === "article" && article
        ? {
            publishedTime: article.publishedTime,
            authors: article.authors,
            tags: article.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${profile.name}`,
      description: desc,
    },
  };
}
