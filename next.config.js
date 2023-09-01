/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
// const withVideos = require("next-videos");

module.exports = nextConfig;
// module.exports = withVideos();
