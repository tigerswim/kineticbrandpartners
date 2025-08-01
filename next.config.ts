import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/job-tracker",
  assetPrefix: "/job-tracker",
  trailingSlash: true,
  output: "export",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
