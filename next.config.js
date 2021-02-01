module.exports = {
  images: {
    domains: ['cdn.hashnode.com', 'hashnode.imgix.net'],
  },
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      config.node = { fs: 'empty', module: 'empty' };
    }

    return config;
  },
};
