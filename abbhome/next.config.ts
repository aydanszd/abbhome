import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.abbhome.az', 'abbhome.az'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Development'ta loopback IP'lere izin ver
  experimental: {
    allowedOrigins: ['localhost:5000'],
  },
};

export default nextConfig;