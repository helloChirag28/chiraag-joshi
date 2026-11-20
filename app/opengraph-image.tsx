import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const cols = Array.from({ length: 13 }, (_, i) => i);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          color: "#ededea",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {cols.map((i) => (
          <div
            key={i}
            style={{ position: "absolute", top: 0, bottom: 0, left: 80 + i * 86.6, width: 1, background: "#26262a" }}
          />
        ))}
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#a3a39e" }}>
          {`${site.title.toUpperCase()} · REMOTE · IST (UTC+5:30)`}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>{site.name}</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 28, fontSize: 40, color: "#a3a39e" }}>
            <div style={{ width: 18, height: 18, background: "#ff5b1f", marginRight: 20 }} />
            .NET · Angular · React · Next.js · NestJS
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#75756f" }}>CHIRAAGJOSHI.COM</div>
      </div>
    ),
    size,
  );
}
