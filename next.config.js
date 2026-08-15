/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.STATIC_EXPORT === "1" ? { output: "export" } : {}),
  images: {
    remotePatterns: [],
    unoptimized: process.env.STATIC_EXPORT === "1",
  },
};

module.exports = nextConfig;
