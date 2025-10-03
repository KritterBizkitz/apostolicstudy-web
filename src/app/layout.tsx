import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppHeader from "../components/AppHeader"; // ← relative path from /app to /components
import Script from "next/script";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



// app/layout.tsx
export const metadata = {
  metadataBase: new URL("https://apostolicstudy.org"),
  title: { default: "ApostolicStudy", template: "%s · ApostolicStudy" },
  description:
    "Designed around Apostolic doctrine, tools that help you study, teach, and stay anchored to the Word. Rightly dividing the word of truth is paramount to our growth and stability as believers.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-48x48.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-48x48.png" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  openGraph: {
    title: "ApostolicStudy",
    description:
      "Designed around Apostolic doctrine, tools that help you study, teach, and stay anchored to the Word. Rightly dividing the word of truth is paramount to our growth and stability as believers.",
    url: "https://apostolicstudy.org",
    siteName: "ApostolicStudy",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ApostolicStudy",
    description:
      "Designed around Apostolic doctrine, tools that help you study, teach, and stay anchored to the Word. Rightly dividing the word of truth is paramount to our growth and stability as believers.",
    images: ["/og.jpg"],
  },
  
};
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ApostolicStudy",
  url: "https://apostolicstudy.org",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://apostolicstudy.org/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ApostolicStudy",
  url: "https://apostolicstudy.org",
  logo: "https://apostolicstudy.org/apple-touch-icon.png",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Put JSON-LD in <head>. Use __html with two underscores. */}
        <Script
          id="ld-json-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <Script
          id="ld-json-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
