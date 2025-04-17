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
};

export default withNextIntl(config);
