/**
 * GRAPHICS — social media creatives, motion videos and other design work.
 *
 * Shown under the "Graphics" tab on /portfolio. Unlike websites these don't
 * get a case-study page; clicking a card opens it in a lightbox.
 *
 * To add one:
 *   - images: drop `<id>.jpg` (full, ~1600px) and `<id>-sm.jpg` (~800px
 *     thumbnail) into /public/graphics/;
 *   - videos: drop `<id>.mp4` plus a poster frame `<id>.jpg`, set
 *     `format: "video"`, point `src` at the mp4 and `thumb` at the poster.
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
  year: string;
  description?: string;
  /** Website case study for the same client, if there is one. */
  project?: string;
};

export const graphics: Graphic[] = [
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
