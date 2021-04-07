const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");

// next.js configuration
const nextConfig = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
  },
  future: {
    webpack5: true,
  },
});

module.exports = withPlugins(
  [withOptimizedImages, { optimizeImagesInDev: true }],
  nextConfig
);
