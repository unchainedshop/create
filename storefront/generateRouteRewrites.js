const routes = require('./routes');

const generateRouteRewrites = () => {
  const rewrites = [];
  Object.keys(routes).forEach((destination) => {
    routes[destination].forEach((source) => {
      rewrites.push({
        source,
        destination,
      });
    });
  });
  return rewrites;
};

module.exports = generateRouteRewrites;
