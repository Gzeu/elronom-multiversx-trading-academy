const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*\.(png|jpe?g|webp|svg|gif|tiff|js|css)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-resources',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        }
      }
    },
    {
      urlPattern: /^https:\/\/api\.multiversx\.com\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'multiversx-api',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 5 * 60 // 5 minutes
        }
      }
    }
  ]
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: [
      'images.unsplash.com',
      'api.multiversx.com',
      'media.elronom.com'
    ],
    formats: ['image/webp', 'image/avif']
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    MULTIVERSX_CHAIN_ID: process.env.MULTIVERSX_CHAIN_ID || 'D',
    MULTIVERSX_API_URL: process.env.MULTIVERSX_API_URL || 'https://devnet-api.multiversx.com'
  },
  webpack: (config, { dev, isServer }) => {
    // Add WASM support for MultiversX
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true
    }
    
    return config
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = withBundleAnalyzer(withPWA(nextConfig))