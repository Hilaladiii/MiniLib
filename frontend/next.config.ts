import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "msymtmexwcxpepuqliql.supabase.co",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
