/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "tailwindui.com",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "lh6.googleusercontent.com",
    ],
    minimumCacheTTL: 3600,
  },
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    SERVER_URI: process.env.SERVER_URI,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
