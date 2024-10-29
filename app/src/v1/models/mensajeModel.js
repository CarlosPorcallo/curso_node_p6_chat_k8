// se importa e instancía dotenv
require('dotenv').config();
// se importa el cliente de mongodb
const { getClient } = require("../lib/mongoClient");
const mongo_client = getClient();

// se selecciona la BD y la colección para los mensajes
const db = mongo_client.db(process.env.MONGO_DB);
const col = db.collection(process.env.MONGO_MSG_COLLECTION);

// se crean sus métodos
const get = async () => {
    const query = {};
    const options = {_id: -1};
    const mensajes = await col.find(query, options);
    return mensajes.toArray();
};

const save = async data_message => {
    const insertResult = await col.insertMany([data_message]);
    return insertResult.acknowledged;
};

module.exports = {
    get,
    save
};