import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const dynamic = "force-static";
export const alt = `${profile.name} — ${profile.positioning}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#090909", color: "#fff", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 4, color: "#9a9a9a" }}>
          <span>MU / 001</span>
          <span>{profile.locationShort}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, fontWeight: 700, lineHeight: 0.88, letterSpacing: -6 }}>MUHAMMAD</div>
          <div style={{ fontSize: 150, fontWeight: 700, lineHeight: 0.88, letterSpacing: -6 }}>USMAN</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#d8d8d8", borderTop: "1px solid #242424", paddingTop: 24 }}>
          <span>SECURITY / CLOUD / INFRASTRUCTURE</span>
          <span>CS&amp;E — {profile.graduation}</span>
        </div>
      </div>
    ),
    size,
  );
}
