const config = require('./theme.json');

const generateRouteRewrites = () => {
  const routes = config.localizedRoutes || [];
  const rewrites = [];
  Object.keys(routes).forEach((route) => {
    routes[route].localizations.forEach((source) => {
      rewrites.push({
        source: source.trim(),
        destination: routes[route].destination.trim(),
      });
    });
  });
  return rewrites;
};

module.exports = generateRouteRewrites;
