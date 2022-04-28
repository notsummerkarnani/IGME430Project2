require('dotenv').config();

const staticAssets = {
  development: {
    path: 'hosted/',
    bulma: 'node_modules/bulma/css',
  },
  production: {
    path: 'hosted/',
    bulma: 'node_modules/bulma/css',
  },
};

const connections = {
  development: {
    http: {
      port: 3000,
    },
    mongo: process.env.MONGODB_URI,
    redis: process.env.REDISCLOUD_URL,
    ingredientEndpoint: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    idEndpoint: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
    nameEndpoint: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  },

  production: {
    http: {
      port: process.env.PORT || process.env.NODE_PORT || 3000,
    },
    mongo: process.env.MONGODB_URI,
    redis: process.env.REDISCLOUD_URL,
    ingredientEndpoint: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    idEndpoint: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
    nameEndpoint: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  },
};

module.exports = {
  staticAssets: staticAssets[process.env.NODE_ENV],
  connections: connections[process.env.NODE_ENV],
  secret: process.env.SECRET,
};
