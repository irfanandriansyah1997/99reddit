/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "a.thumbs.redditmedia.com",
        pathname: "**",
        port: "",
        protocol: "https",
      },
      {
        hostname: "styles.redditmedia.com",
        pathname: "**",
        port: "",
        protocol: "https",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
