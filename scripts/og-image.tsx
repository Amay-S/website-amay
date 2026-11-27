import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Source for src/app/opengraph-image.png. To regenerate: temporarily move this file to
// src/app/opengraph-image.tsx, run `npm run build`, copy out/opengraph-image to
// src/app/opengraph-image.png, then move this file back. (Static hosts need the .png
// extension to serve the right content type.)
export const dynamic = "force-static";
export const alt = `${site.hero.name}, ${site.hero.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const stats = site.hero.highlights.filter((h) => h.featured).slice(0, 3);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0f1c",
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(99,102,241,0.45), transparent 45%), radial-gradient(circle at 90% 20%, rgba(56,189,248,0.32), transparent 45%)",
          color: "#e8edf6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #4f46e5, #0ea5e9)",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            AS
          </div>
          <div style={{ fontSize: 26, color: "#aab4c8" }}>heyitsamay.com</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>{site.hero.name}</div>
          <div style={{ fontSize: 38, color: "#a5b4fc", marginTop: 8 }}>{site.hero.title}</div>
          <div style={{ fontSize: 28, color: "#aab4c8", marginTop: 18 }}>AI/ML-powered FinOps · Agile delivery · AWS & Azure</div>
        </div>
        <div style={{ display: "flex", gap: 48 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 44, fontWeight: 700 }}>{s.value}</div>
              <div style={{ fontSize: 22, color: "#aab4c8" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
