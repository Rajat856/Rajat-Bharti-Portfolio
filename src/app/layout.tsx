import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/layout/Providers";
import { themeInitScript } from "@/components/layout/ThemeProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/Primitives";
import { profile } from "@/lib/data/profile";
import { siteUrl } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const homeTitle = `${profile.name} — Shopify, Webflow & AI Automation Developer`;
const homeDescription =
  "Rajat Bharti is a Bengaluru-based web developer building fast Shopify, Webflow and WordPress sites, custom web apps and AI automation. 34+ websites shipped.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: `%s · ${profile.name}`,
  },
  description: homeDescription,
  applicationName: `${profile.name} — Portfolio`,
  keywords: [
    "Rajat Bharti",
    "web developer Bengaluru",
    "freelance web developer India",
    "Shopify developer",
    "Webflow developer",
    "WordPress developer",
    "WooCommerce developer",
    "e-commerce website developer",
    "custom web application developer",
    "AI automation",
    "n8n automation",
    "AI product developer",
    "technical SEO",
    "Three.js 3D websites",
    "social media creatives",
    "motion graphics",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: `${profile.name} — Portfolio`,
    title: homeTitle,
    description: homeDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name} — web developer portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  // Search Console / Bing ownership: set these env vars in Vercel to the codes
  // they give you (the "HTML tag" method) — no redeploy of code needed.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08080b" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7f9" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: profile.name,
  givenName: "Rajat",
  familyName: "Bharti",
  url: siteUrl,
  image: `${siteUrl}${profile.avatar}`,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
  description: profile.summary,
  sameAs: profile.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  knowsAbout: [
    "Web Development",
    "WordPress",
    "Webflow",
    "Shopify",
    "WooCommerce",
    "Next.js",
    "AI Automation",
    "n8n",
    "Technical SEO",
    "Three.js",
    "UI/UX Design",
    "Graphic Design",
    "Motion Graphics",
  ],
  worksFor: { "@type": "Organization", name: "ProductOS" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: `${profile.name} — Portfolio`,
  alternateName: profile.name,
  url: siteUrl,
  inLanguage: "en",
  description: homeDescription,
  author: { "@id": `${siteUrl}/#person` },
  publisher: { "@id": `${siteUrl}/#person` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${mono.variable} light`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="grain antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-canvas"
          >
            Skip to content
          </a>

          <SmoothScroll />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />

          {/* The page transition lives in app/template.tsx — see the note there. */}
          {children}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
