import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Container, Eyebrow, btnPrimary } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="top" className="relative isolate">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-aurora absolute inset-0" />
          <div className="bg-grid absolute inset-0" />
        </div>
        <Container className="flex min-h-[80dvh] flex-col items-start justify-center py-32">
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="mt-4 font-display text-h1 font-semibold tracking-tight text-fg">
            This page didn&rsquo;t make the release.
          </h1>
          <p className="mt-4 max-w-[52ch] text-lead text-fg-muted">
            The link may be outdated, or the page may have moved. Everything lives on the home page.
          </p>
          <Link href="/" className={`${btnPrimary} mt-8`}>
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to home
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
