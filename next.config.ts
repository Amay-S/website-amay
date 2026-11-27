import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    // Pin the root so a stray lockfile in a parent folder isn't picked up.
    root: __dirname,
  },
};

export default nextConfig;
