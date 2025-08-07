/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' || process.env.DEPLOY_TARGET === 'github';
const isVercel = process.env.VERCEL === '1';

const nextConfig = {
  // Configuración para GitHub Pages solo cuando se despliega en GitHub
  ...(isProd && isGitHubPages && { output: 'export' }),
  trailingSlash: true,
  basePath: (isProd && isGitHubPages) ? '/jolly-games' : '',
  assetPrefix: (isProd && isGitHubPages) ? '/jolly-games' : '',
  
  experimental: {
    // appDir eliminado porque ya no es necesario
  },
  images: {
    unoptimized: true, // Necesario para imágenes estáticas en public/
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
    ignoreDuringBuilds: true,
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
