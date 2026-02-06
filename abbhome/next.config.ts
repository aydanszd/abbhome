import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'abbhome.az',
      },
      {
        protocol: 'https',
        hostname: 'cdn.abbhome.az',
      },
    ],
  },
};

export default nextConfig;