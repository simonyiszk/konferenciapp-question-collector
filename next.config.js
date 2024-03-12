/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'konf-api-staging.kir-dev.hu',
      },
      {
        protocol: 'https',
        hostname: 'konf-api.kir-dev.hu',
      },
    ],
  },
};

module.exports = nextConfig;
