import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://localhost:3000", "http://192.168.1.6:3000"],
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
