import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    // turbopack: true, // or false if you want to use Webpack
  },
};

export default nextConfig;
