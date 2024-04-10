'use strict';

const fastifyPlugin = require('fastify-plugin');
const fastifyMongoPlugin = require('@fastify/mongodb');

//const connectionString = `mongodb://${username}:${password}@${hostname}/${dbName}`

async function dbConnector (fastify, options) {
  fastify.register(fastifyMongoPlugin, {
    url: `mongodb://${process.env.mongo_username}:${process.env.mongo_password}@${process.env.mongo_hostname}/${process.env.mongo_dbname}`
  });
}

module.exports = fastifyPlugin(dbConnector, {
  name: 'mongo-connector'
});
