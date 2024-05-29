/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    NEXT_BASE_API_URL: process.env.NEXT_BASE_API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `${process.env.NEXT_BASE_API_URL}/:path*`,
        basePath: false
      },
    ];
  },
};

module.exports = nextConfig;
