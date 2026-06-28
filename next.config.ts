import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:locale(en|fi)/campaigns',
        destination: '/:locale/promotions',
        permanent: true,
      },
      {
        source: '/campaigns',
        destination: '/promotions',
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
