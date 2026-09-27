/**
 * GRAPHICS — social media creatives, motion videos and other design work.
 *
 * Shown under the "Graphics" tab on /portfolio. Unlike websites these don't
 * get a case-study page; clicking a card opens it in a lightbox.
 *
 * To add one:
 *   - images: drop `<id>.jpg` (full, ~1600px) and `<id>-sm.jpg` (~800px
 *     thumbnail) into /public/graphics/;
 *   - videos: drop `<id>.mp4` (web encode, +faststart), a poster frame
 *     `<id>-sm.jpg`, and optionally an ~8s muted `<id>-preview.mp4` that
 *     plays on the card; set `format: "video"`.
 */

export const graphicCategories = ["All", "Social Media", "Motion Video"] as const;
export type GraphicCategory = Exclude<(typeof graphicCategories)[number], "All">;

export type Graphic = {
  id: string;
  title: string;
  client: string;
  category: GraphicCategory;
  format: "image" | "video";
  /** Full-size image or the mp4. */
  src: string;
  /** Grid thumbnail (for videos: the poster frame). */
  thumb: string;
  /** Videos only: short muted loop played on the card. */
  preview?: string;
  year: string;
  description?: string;
  /** Website case study for the same client, if there is one. */
  project?: string;
};

export const graphics: Graphic[] = [
  {
    id: "eloire-radiance-serum",
    title: "Éloire — Radiance Serum Ad",
    client: "Éloire",
    category: "Motion Video",
    format: "video",
    src: "/graphics/eloire-radiance-serum.mp4",
    thumb: "/graphics/eloire-radiance-serum-sm.jpg",
    preview: "/graphics/eloire-radiance-serum-preview.mp4",
    year: "2026",
    description: "30s cinematic skincare ad — liquid-gold macro shots, ingredient callouts (12% niacinamide, hyaluronic acid) and a hero bottle reveal. Pure radiance, revealed.",
  },
  {
    id: "productos-one-shot",
    title: "ProductOS — One Prompt to Shipped App",
    client: "ProductOS",
    category: "Motion Video",
    format: "video",
    src: "/graphics/productos-one-shot.mp4",
    thumb: "/graphics/productos-one-shot-sm.jpg",
    preview: "/graphics/productos-one-shot-preview.mp4",
    year: "2026",
    description: "30s one-shot walkthrough — a single prompt for a dog-groomer booking app goes through research, PRD, design and code to a live web + mobile product.",
  },
  {
    id: "kindly-objects-motion",
    title: "Kindly Objects — Brand Film",
    client: "Kindly Objects",
    category: "Motion Video",
    format: "video",
    src: "/graphics/kindly-objects-motion.mp4",
    thumb: "/graphics/kindly-objects-motion-sm.jpg",
    preview: "/graphics/kindly-objects-motion-preview.mp4",
    year: "2026",
    description: "53s brand film — 3D-printed, made-to-order objects, the photo-to-figurine personalisation flow and the launch range. Designed. Printed. Made kinder.",
    project: "kindly-objects",
  },
  {
    id: "productos-motion",
    title: "ProductOS — Idea in. Product out.",
    client: "ProductOS",
    category: "Motion Video",
    format: "video",
    src: "/graphics/productos-motion.mp4",
    thumb: "/graphics/productos-motion-sm.jpg",
    preview: "/graphics/productos-motion-preview.mp4",
    year: "2026",
    description: "30s launch film for the AI-native product OS — research, design and code agents taking an idea to a shipped product overnight.",
  },
  {
    id: "virusha-tech-motion",
    title: "Virusha Tech — Brand Film",
    client: "Virusha Technologies",
    category: "Motion Video",
    format: "video",
    src: "/graphics/virusha-tech-motion.mp4",
    thumb: "/graphics/virusha-tech-motion-sm.jpg",
    preview: "/graphics/virusha-tech-motion-preview.mp4",
    year: "2026",
    description: "20s kinetic-type brand film covering the studio's services and industries — designed, built, shipped.",
    project: "virusha-tech",
  },
  {
    id: "1prompt-teaser",
    title: "1prompt — Launch Teaser",
    client: "1prompt",
    category: "Motion Video",
    format: "video",
    src: "/graphics/1prompt-teaser.mp4",
    thumb: "/graphics/1prompt-teaser-sm.jpg",
    preview: "/graphics/1prompt-teaser-preview.mp4",
    year: "2026",
    description: "30s teaser for an AI app builder — six agents turn one prompt into a working app.",
  },
  {
    id: "bluebarrows-storage",
    title: "Minimalist Storage Solutions",
    client: "Blue Barrows",
    category: "Social Media",
    format: "image",
    src: "/graphics/bluebarrows-storage.jpg",
    thumb: "/graphics/bluebarrows-storage-sm.jpg",
    year: "2023",
    description: "Instagram feed post for the home-organisation range.",
    project: "blue-barrows",
  },
  {
    id: "bluebarrows-soap",
    title: "Artisanal Beauty for Daily Rituals",
    client: "Blue Barrows",
    category: "Social Media",
    format: "image",
    src: "/graphics/bluebarrows-soap.jpg",
    thumb: "/graphics/bluebarrows-soap-sm.jpg",
    year: "2023",
    description: "Instagram feed post for the handmade soap collection.",
    project: "blue-barrows",
  },
];
