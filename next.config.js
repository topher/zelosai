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
      "res.cloudinary.com"
    ],
  },
};

module.exports = nextConfig;
