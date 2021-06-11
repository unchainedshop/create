const config = require('./theme.json');

const generateRouteRewrites = () => {
  const routes = config.localizedRoutes || [];
  const rewrites = [];
  Object.keys(routes).forEach((route) => {
    routes[route].localizations.forEach((source) => {
      rewrites.push({
        source,
        destination: routes[route].destination,
      });
    });
  });
  return rewrites;
};

module.exports = generateRouteRewrites;
