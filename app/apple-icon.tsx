import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — HK monogram, emerald on deep teal-navy.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0E1C30, #0A1424)",
          color: "#10B981",
          fontSize: 96,
          fontWeight: 800,
          fontFamily: "monospace",
          letterSpacing: -4,
        }}
      >
        HK
      </div>
    ),
    { ...size },
  );
}
