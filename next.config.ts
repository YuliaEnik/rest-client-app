import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json',
  },
});

const config: NextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/rest-client-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/rest-client-app/' : '',

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'node:process': 'process/browser.js',
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      process: require.resolve('process/browser'),
    };
    return config;
  },
};

export default withNextIntl(config);
