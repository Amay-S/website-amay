import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Hide the Next.js dev-tools badge ("N") during `npm run dev`; errors still show.
  devIndicators: false,
  turbopack: {
    // Pin the root so a stray lockfile in a parent folder isn't picked up.
    root: __dirname,
  },
};

export default nextConfig;
