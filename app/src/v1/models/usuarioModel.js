// se importa e instancía dotenv
require('dotenv').config();
// se importa el cliente de mongodb
const { getClient } = require("../lib/mongoClient");
const mongo_client = getClient();

// se selecciona la BD y la colección para los usuarios
const db = mongo_client.db(process.env.MONGO_DB);
const col = db.collection(process.env.MONGO_USR_COLLECTION);

// se crean sus métodos
const get = async (query, options) => {
    const usuarios = await col.find(query, options);
    return usuarios.toArray();
};

const save = async data_user => {
    const insertResult = await col.insertMany([data_user]);
    return insertResult.acknowledged;
};

module.exports = {
    get,
    save
};