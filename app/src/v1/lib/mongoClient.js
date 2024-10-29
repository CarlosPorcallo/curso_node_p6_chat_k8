require('dotenv').config();
const { MongoClient } = require("mongodb");
const mongo_db_uri = process.env.MONGO_URI;
let client;

const connectToMongoDB = () => {
    try {
      client = new MongoClient(mongo_db_uri);
      console.log("Cliente MongoDB inicializado correctamente.");
    } catch (error) {
      log.error(error.message, { stack: error.stack });
      throw error;
    }
};

const getClient = () => {
    if (client === undefined) {
      console.error('Cliente MongoDB no inicializado.');
      connectToMongoDB()
    }
    return client;
};

module.exports = {
    getClient
};