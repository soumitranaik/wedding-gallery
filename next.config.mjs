import withPWA from "@ducanh2912/next-pwa";

const pwaConfig = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === 'development', // Disable in dev
  workboxOptions: {
    disableDevLogs: true,
    // Exclude Next.js image optimization and Cloudinary URLs
    exclude: [
      /_next\/image\?url=.+/,
      /\/_next\/static\/.+\.(?:png|jpg|jpeg|svg|webp)/,
      /\.(?:png|jpg|jpeg|svg|webp)$/,
    ],
    // Define runtime caching rules
    runtimeCaching: [
      {
        urlPattern: /^https?:\/\/res\.cloudinary\.com\/.+/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'cloudinary-images',
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
      {
        urlPattern: /\/_next\/image\?url=.+/,
        handler: 'NetworkOnly', // Don't cache optimized images
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [ 'res.cloudinary.com'],
    // Disable image optimization in dev
    unoptimized: process.env.NODE_ENV === 'development',
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      encoding: false,
      fs: false,
      path: false,
    };
    return config;
  },
};

export default pwaConfig(nextConfig);