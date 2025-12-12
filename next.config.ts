import type { NextConfig } from "next";

const hostnames = ['res.cloudinary.com', "i.vimeocdn.com"];
const nextConfig: NextConfig = {
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: 'https',
      hostname: hostname,
    })),
  },
};

export default nextConfig;
