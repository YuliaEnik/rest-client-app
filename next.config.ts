import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/rest-client-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/rest-client-app/' : '',
};

export default nextConfig;
