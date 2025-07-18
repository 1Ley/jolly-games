/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir eliminado porque ya no es necesario
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jolly-games.com',
        port: '',
        pathname: '/**',
      },
      {
          protocol: 'https',
          hostname: 'mc-heads.net',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'api.mojang.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'crafthead.net',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'playerdb.co',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'media.discordapp.net',
          port: '',
          pathname: '/**',
        },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
