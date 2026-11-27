import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { SITE_URL, personJsonLd, site } from "@/lib/site";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.meta.title, template: `%s | ${site.hero.name}` },
  description: site.meta.description,
  alternates: { canonical: "/" },
  authors: [{ name: site.hero.name, url: SITE_URL }],
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.hero.name,
    title: site.meta.title,
    description: site.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.meta.title, description: site.meta.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8f9" },
    { media: "(prefers-color-scheme: dark)", color: "#060a13" },
  ],
};

/*
 * Runs before first paint: applies the saved or system theme (no flash),
 * and opts the page into scroll reveals only when motion is allowed.
 * If the app bundle never boots, reveals are switched off after 2.5s so
 * content can't stay hidden.
 */
const bootScript = `(function(){try{var d=document.documentElement,s=localStorage.getItem('theme'),m=window.matchMedia;var t=s==='light'||s==='dark'?s:(m&&m('(prefers-color-scheme: dark)').matches?'dark':'light');d.dataset.theme=t;if('IntersectionObserver' in window&&!(m&&m('(prefers-reduced-motion: reduce)').matches)){d.classList.add('reveal-ready');setTimeout(function(){if(!window.__revealBooted)d.classList.remove('reveal-ready')},2500)}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-dvh overflow-x-clip">{children}</body>
    </html>
  );
}
