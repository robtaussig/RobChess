const withPWA = require('next-pwa');
const WorkerPlugin = require("worker-plugin");

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    register: true,
    scope: '/app',
    sw: 'service-worker.js',
    //...
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.plugins.push(
        new WorkerPlugin({
          // use "self" as the global object when receiving hot updates.
          globalObject: "self",
        })
      );
    }
    return config;
  },
});
