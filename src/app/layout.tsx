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
  title: 'ApostolicStudy',
  description: 'KJV study tools, notes, and resources.',
  openGraph: {
    type: 'website',
    url: 'https://apostolicstudy.org',
    title: 'ApostolicStudy',
    description: 'KJV study tools, notes, and resources.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApostolicStudy',
    description: 'KJV study tools, notes, and resources.',
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
