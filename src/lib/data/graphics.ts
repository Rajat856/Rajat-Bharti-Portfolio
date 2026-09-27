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
    id: "shunya-01",
    title: "Join Our Pottery Workshop",
    client: "Shunya Pottery Studio",
    category: "Social Media",
    format: "image",
    src: "/graphics/shunya-01.jpg",
    thumb: "/graphics/shunya-01-sm.jpg",
    year: "2024",
    description: "Launch post for the clay workshop series — arch-framed wheel shot with the full event details.",
  },
  {
    id: "shunya-03",
    title: "Weekend Pottery Workshop — Limited Seats",
    client: "Shunya Pottery Studio",
    category: "Social Media",
    format: "image",
    src: "/graphics/shunya-03.jpg",
    thumb: "/graphics/shunya-03-sm.jpg",
    year: "2024",
    description: "Event post with a split info panel and a 'Book your slot now' call to action.",
  },
  {
    id: "shunya-02",
    title: "Pottery Making Workshop",
    client: "Shunya Pottery Studio",
    category: "Social Media",
    format: "image",
    src: "/graphics/shunya-02.jpg",
    thumb: "/graphics/shunya-02-sm.jpg",
    year: "2024",
    description: "Full-bleed close-up with a three-column date / time / venue strip.",
  },
  {
    id: "shunya-04",
    title: "Weekend Pottery Workshop — Book Now",
    client: "Shunya Pottery Studio",
    category: "Social Media",
    format: "image",
    src: "/graphics/shunya-04.jpg",
    thumb: "/graphics/shunya-04-sm.jpg",
    year: "2024",
    description: "Light, editorial layout with circular photo crops and botanical line art.",
  },
  {
    id: "shunya-05",
    title: "Bond With Your Loved Ones Over Clay",
    client: "Shunya Pottery Studio",
    category: "Social Media",
    format: "image",
    src: "/graphics/shunya-05.jpg",
    thumb: "/graphics/shunya-05-sm.jpg",
    year: "2024",
    description: "Family-session campaign built around real studio photos in tilted frames.",
  },
  {
    id: "shunya-06",
    title: "Relax & Destress With Pottery Therapy",
    client: "Shunya Pottery Studio",
    category: "Social Media",
    format: "image",
    src: "/graphics/shunya-06.jpg",
    thumb: "/graphics/shunya-06-sm.jpg",
    year: "2024",
    description: "Wellness-angle post with a framed hero image over a spinning-wheel backdrop.",
  },
  {
    id: "shunya-08",
    title: "Live in the Moment",
    client: "Shunya Pottery Studio",
    category: "Social Media",
    format: "image",
    src: "/graphics/shunya-08.jpg",
    thumb: "/graphics/shunya-08-sm.jpg",
    year: "2024",
    description: "Mindfulness post pairing a real workshop photo with a calm card layout.",
  },
  {
    id: "shunya-07",
    title: "Weekend Workshop — 21st & 22nd September",
    client: "Shunya Pottery Studio",
    category: "Social Media",
    format: "image",
    src: "/graphics/shunya-07.jpg",
    thumb: "/graphics/shunya-07-sm.jpg",
    year: "2024",
    description: "Second-weekend announcement with a bold brown info card.",
  },
  {
    id: "shunya-09",
    title: "Center Yourself in Clay",
    client: "Shunya Pottery Studio",
    category: "Social Media",
    format: "image",
    src: "/graphics/shunya-09.jpg",
    thumb: "/graphics/shunya-09-sm.jpg",
    year: "2024",
    description: "High-contrast brand post — hero photo fading into a black caption band.",
  },
  {
    id: "shunya-10",
    title: "Weekend Workshop — 28th & 29th September",
    client: "Shunya Pottery Studio",
    category: "Social Media",
    format: "image",
    src: "/graphics/shunya-10.jpg",
    thumb: "/graphics/shunya-10-sm.jpg",
    year: "2024",
    description: "White-frame event post with a structured details row.",
  },
  {
    id: "shunya-13",
    title: "Weekend Pottery Workshop — Date, Venue & Time",
    client: "Shunya Pottery Studio",
    category: "Social Media",
    format: "image",
    src: "/graphics/shunya-13.jpg",
    thumb: "/graphics/shunya-13-sm.jpg",
    year: "2024",
    description: "Three-circle photo layout with colour-coded info tiles and a Book Now button.",
  },
  {
    id: "shunya-11",
    title: "Let's Get Ready for the Weekend Workshop",
    client: "Shunya Pottery Studio",
    category: "Social Media",
    format: "image",
    src: "/graphics/shunya-11.jpg",
    thumb: "/graphics/shunya-11-sm.jpg",
    year: "2024",
    description: "Countdown-style teaser with a dotted headline frame.",
  },
  {
    id: "shunya-12",
    title: "Weekend Pottery Workshop — Studio Moments",
    client: "Shunya Pottery Studio",
    category: "Social Media",
    format: "image",
    src: "/graphics/shunya-12.jpg",
    thumb: "/graphics/shunya-12-sm.jpg",
    year: "2024",
    description: "Collage post mixing participant photos with the event details.",
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
