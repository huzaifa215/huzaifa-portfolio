import { OG_SIZE, OG_CONTENT_TYPE, renderOg } from "@/lib/og";

export const alt = "About Huzaifa Khalid - engineering & security approach";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOg({
    eyebrow: "About",
    title: "Performance is the experience, not an afterthought.",
    subtitle: "Engineering philosophy, working style, and the journey behind the work.",
  });
}
