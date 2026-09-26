import { ImageResponse } from "next/og";
import { profile } from "@/lib/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated social card — no binary asset to keep in sync. */
export default function Image() {
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
          background: "linear-gradient(135deg, #08080b 0%, #14141b 55%, #271663 100%)",
          color: "#f2f2f5",
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(124,92,255,0.55), transparent 68%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(34,211,238,0.28), transparent 68%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 9999,
              background: "linear-gradient(135deg, #7c5cff, #22d3ee)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            RB
          </div>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#9a9aa6", display: "flex" }}>
            RAJATBHARTI.COM
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, lineHeight: 1.02, letterSpacing: -3, display: "flex" }}>
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 36,
              lineHeight: 1.2,
              color: "#a99af8",
              display: "flex",
            }}
          >
            Senior Web Developer &amp; AI Automation Engineer
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 24,
              color: "#9a9aa6",
              maxWidth: 880,
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            High-performance websites, custom web applications and AI-driven automation systems.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 20,
            color: "#63636f",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 26,
          }}
        >
          <span>WordPress</span>
          <span>·</span>
          <span>Webflow</span>
          <span>·</span>
          <span>Shopify</span>
          <span>·</span>
          <span>n8n</span>
          <span>·</span>
          <span>Bengaluru, IN</span>
        </div>
      </div>
    ),
    size,
  );
}
