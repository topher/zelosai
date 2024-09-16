const path = require('path');

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "cdn.openai.com",
      "images.unsplash.com",
      "unsplash.com",
      "fonts.gstatic.com",
      "cdn.sanity.io",
      "source.unsplash.com",
      "res.cloudinary.com",
    ],
  },
  webpack: (config) => {
    // Add the externals to prevent SSR issues with Web3Modal
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    // Force imports of `web-streams-polyfill/es2018` to resolve to a valid path
    config.resolve.alias['web-streams-polyfill/es2018'] = path.resolve(
      __dirname,
      'node_modules/web-streams-polyfill/dist/ponyfill.js'
    );

    return config;
  },
};

module.exports = nextConfig;
