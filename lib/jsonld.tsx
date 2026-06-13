import { faqs, profile } from "./resume";
import { siteUrl } from "./metadata";

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    email: profile.links.email,
    jobTitle: profile.titles[0],
    description: profile.summary,
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}/images/huzaifa-khalid.png`,
      width: 2176,
      height: 3840,
      caption:
        "Huzaifa Khalid - Full Stack Developer & Cybersecurity Specialist",
    },
    sameAs: [profile.links.github, profile.links.linkedin],
    knowsAbout: [
      "React",
      "Angular",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "NestJS",
      "MongoDB",
      "PostgreSQL",
      "REST APIs",
      "Microservices",
      "Cybersecurity",
      "SIEM",
      "Incident Response",
      "MITRE ATT&CK",
      "Vulnerability Management",
      "Full Stack Development",
    ],
    knowsLanguage: ["English", "Urdu"],
    nationality: "Pakistani",
    availableForHire: true,
    workLocation: {
      "@type": "Place",
      name: "Toronto, ON, Canada",
    },
    areaServed: ["Canada", "Worldwide", "Remote"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact - ${profile.name}`,
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      email: profile.links.email,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "professional inquiry",
        email: profile.links.email,
        availableLanguage: ["English", "Urdu"],
      },
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile.name,
    url: siteUrl,
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
