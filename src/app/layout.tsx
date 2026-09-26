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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role} & AI Automation Engineer`,
    template: `%s · ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    "Rajat Bharti",
    "Senior Web Developer",
    "WordPress Developer",
    "Webflow Developer",
    "Shopify Developer",
    "AI Automation",
    "n8n",
    "Three.js",
    "Bengaluru",
    "Freelance Web Developer India",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — ${profile.role} & AI Automation Engineer`,
    description: profile.summary,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "/" },
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
  name: profile.name,
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
    "AI Automation",
    "Technical SEO",
    "Three.js",
    "UI/UX Design",
  ],
  worksFor: { "@type": "Organization", name: "ProductOS" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${mono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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
