import { OG_SIZE, OG_CONTENT_TYPE, renderOg } from "@/lib/og";

export const alt = "Huzaifa Khalid - Full Stack Developer & Cybersecurity Specialist";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "Available for work",
    title: "Full Stack Developer & Cybersecurity Specialist",
    subtitle: "React · NestJS · Node.js · secure SDLC — plus SIEM, incident response & MITRE ATT&CK.",
  });
}
