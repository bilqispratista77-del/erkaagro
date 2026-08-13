import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove "standalone" for Vercel/Cloudflare (they handle output format)
  // output: "standalone",  // Uncomment only for self-hosted VPS/Docker

  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
