require('dotenv').config();

const staticAssets = {
    development: {
        path: 'hosted/',
        bulma: 'node_modules/bulma/css',
        fontAwe: 'node_modules/@fortawesome/free-regular-svg-icons',
    },
    production: {
        path: 'hosted/',
        bulma: 'node_modules/bulma/css',
        fontAwe: 'node_modules/@fortawesome/free-regular-svg-icons',
    },
};

const connections = {
    development: {
        http: {
            port: 3000,
        },
        mongo: process.env.MONGODB_URI,
        redis: process.env.REDISCLOUD_URL,
        ingredientEndpoint: process.env.API1,
        idEndpoint: process.env.API2,
        nameEndpoint: process.env.API3,
    },

    production: {
        http: {
            port: process.env.PORT || process.env.NODE_PORT || 3000,
        },
        mongo: process.env.MONGODB_URI,
        redis: process.env.REDISCLOUD_URL,
        ingredientEndpoint: process.env.API1,
        idEndpoint: process.env.API2,
        nameEndpoint: process.env.API3,
    },
};

module.exports = {
    staticAssets: staticAssets[process.env.NODE_ENV],
    connections: connections[process.env.NODE_ENV],
    secret: process.env.SECRET,
};