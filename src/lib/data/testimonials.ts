/**
 * ⚠️ PLACEHOLDER CONTENT — DO NOT PUBLISH AS-IS.
 *
 * These quotes are written examples so the testimonials section renders with
 * realistic proportions. They are NOT real client statements. Replace every
 * entry with a genuine, attributed quote (LinkedIn recommendations are the
 * easiest source) or remove the <Testimonials /> section from the Home page
 * before the site goes live.
 */

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  /** Set to true once the quote has been replaced with a real, approved one. */
  verified: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Replace with a real client quote about scope, communication and the outcome they got. Two to three sentences works best — specific beats effusive.",
    name: "Client Name",
    title: "Founder",
    company: "Company",
    verified: false,
  },
  {
    quote:
      "Replace with a real quote. A line about how the project was run, and a line about the result, is the format that reads as credible rather than decorative.",
    name: "Client Name",
    title: "Marketing Lead",
    company: "Company",
    verified: false,
  },
  {
    quote:
      "Replace with a real quote. LinkedIn recommendations can be pasted here verbatim — remember to link back to the recommender's profile in the `company` field if useful.",
    name: "Client Name",
    title: "Operations Manager",
    company: "Company",
    verified: false,
  },
];

/** The Home page only renders testimonials that have been verified as real. */
export const publishableTestimonials = testimonials.filter((t) => t.verified);
