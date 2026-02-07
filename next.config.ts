import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://i.pinimg.com/**")],
    qualities: [25, 50, 70],
  },
  expireTime: 60,
};

export default nextConfig;
