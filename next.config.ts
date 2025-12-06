import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', 
  trailingSlash: true,// <--- 1. REQUIRED: Tells Next.js to generate HTML files (for the 'out' folder)
  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // <--- 2. REQUIRED: Disables server-side image optimization (cannot be done on static hosting)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
    ],
  },  devIndicators: false,
};

export default nextConfig;