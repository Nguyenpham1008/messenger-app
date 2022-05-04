/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "https://messenger-api.tung.ninja/api/:slug*",
      },
    ];
  },
};

module.exports = nextConfig;
