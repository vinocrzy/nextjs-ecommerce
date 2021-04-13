// const sitemap = require("nextjs-sitemap-generator");

// sitemap({
//   baseUrl: "https://www.ansjewelry.com",
//   pagesDirectory: __dirname + "\\pages",
//   targetDirectory: "public/",
//   sitemapFilename: "sitemap.xml",
//   nextConfigPath: __dirname + "\\next.config.js",
//   ignoredExtensions: ["png", "jpg"],
// });

const sitemap = require("nextjs-sitemap-generator");

// const fs = require("fs");

// const BUILD_ID = fs.readFileSync(".next/BUILD_ID").toString();

sitemap({
  baseUrl: "Your Site URL",
  pagesDirectory: __dirname + "/.next/server/pages",
  targetDirectory: "public/",
  sitemapFilename: "sitemap.xml",
  ignoredExtensions: ["js", "map", "json", "png", "jpg"],
  ignoredPaths: ["assets"], // Exclude everything that isn't static page
});

console.log(`✅ sitemap.xml generated!`);
