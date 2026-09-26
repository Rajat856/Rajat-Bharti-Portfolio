/**
 * TESTIMONIALS — DRAFTS PENDING REAL ATTRIBUTION
 *
 * Each quote is written from what the linked project actually delivered, at
 * Rajat's request, as a stand-in until real client quotes arrive. The NAMES
 * and AVATARS are placeholders (initials only, no photos of real people).
 *
 * Before treating any entry as a real endorsement:
 *   1. replace `quote`, `name` and `title` with the client's own words and
 *      details, and get their OK to publish;
 *   2. drop a photo at /public/images/testimonials/<id>.jpg and set `photo`;
 *   3. set `verified: true`.
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  /** Project the quote refers to — links the card to its case study. */
  project?: string;
  photo?: string;
  verified: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "doodl",
    quote:
      "He took our Figma file and had a live, fast site up far quicker than we expected — and it actually matched the design. The process section finally explains how we work.",
    name: "Aarav M.",
    title: "Founder",
    company: "Doodl Space",
    project: "doodl-space",
    verified: false,
  },
  {
    id: "shipturtle",
    quote:
      "Moving off WordPress was the best decision we made. Our marketing team now publishes pages themselves in minutes instead of waiting on a developer for every change.",
    name: "Priya K.",
    title: "Head of Marketing",
    company: "Shipturtle",
    project: "shipturtle",
    verified: false,
  },
  {
    id: "eye-instruments",
    quote:
      "Surgeons find instruments by procedure now, not by guessing SKU names. The procedure-set bundles alone changed how our customers order.",
    name: "Rahul S.",
    title: "Director",
    company: "Eye Instruments India",
    project: "eye-instruments-india",
    verified: false,
  },
  {
    id: "kindly",
    quote:
      "Personalised products don't fit a normal cart. Rajat built the whole photo-to-approval flow so nothing gets printed until the customer is happy with the design.",
    name: "Meera J.",
    title: "Co-founder",
    company: "Kindly Objects",
    project: "kindly-objects",
    verified: false,
  },
  {
    id: "robgence",
    quote:
      "We had a sharp argument about physical-AI data and a site that buried it. He rebuilt the story around that one idea — and the enquiries got a lot more serious.",
    name: "Vikram R.",
    title: "CEO",
    company: "Robgence",
    project: "robgence-production",
    verified: false,
  },
  {
    id: "virusha",
    quote:
      "Eight service lines, one site, and visitors still land on the right page for their brief. Rajat is the person we hand our hardest builds to.",
    name: "Neha T.",
    title: "Operations Lead",
    company: "Virusha Technologies",
    project: "virusha-tech",
    verified: false,
  },
];

/** Entries confirmed as real, approved client statements. */
export const verifiedTestimonials = testimonials.filter((t) => t.verified);
