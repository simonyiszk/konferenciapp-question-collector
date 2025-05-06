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
      {
        protocol: 'https',
        hostname: 'warp.sch.bme.hu',
      },
      {
        protocol: 'https',
        hostname: 'cdn.kir-dev.hu',
      },
    ],
  },
};

module.exports = nextConfig;
