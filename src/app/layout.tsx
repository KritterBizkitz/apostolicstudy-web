import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppHeader from "../components/AppHeader"; // ← relative path from /app to /components



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://apostolicstudy.org'),
  title: 'ApostolicStudy — Study the Word. Teach with clarity.',
  description: 'ApostolicStudy keeps context before commentary with tools, timelines, and study notes grounded in scriptural truth.',
  openGraph: {
    type: 'website',
    url: 'https://apostolicstudy.org',
    title: 'ApostolicStudy — Study the Word. Teach with clarity.',
    description: 'ApostolicStudy keeps context before commentary with tools, timelines, and study notes grounded in scriptural truth.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApostolicStudy — Study the Word. Teach with clarity.',
    description: 'ApostolicStudy keeps context before commentary with tools, timelines, and study notes grounded in scriptural truth.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-slate-100 antialiased">
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
