// se importa e instancía dotenv
require('dotenv').config();
// se importa el cliente de mongodb
const { getClient } = require("../lib/mongoClient");
const mongo_client = getClient();

// se selecciona la BD y la colección para los tokens de usuario
const db = mongo_client.db(process.env.MONGO_DB);
const col = db.collection(process.env.MONGO_TKN_COLLECTION);

const getAll = async (options) => {
    try {
        const result = await col.find({}, options).toArray((err, result) => {
            if (err) throw err;
            else return result;
        });
        return result;
    } catch (error) {
        console.log(`Ocurrió un error al intentar obtener los tokens: ${error}`)
    }
};

const getBy = async (query, options) => {
    try {
        const result = await col.findOne(query, options);
        return result;
    } catch (error) {
        console.error('Ocurrió un error al intentar obtener el token'. error.message)
    }
};

const create = async (doc) => {
    try {
        const indexExists = await col.indexExists("timestamp");

        if (!indexExists) {
            await col.createIndex({ "timestamp": 1 }, { expireAfterSeconds:  parseInt(process.env.TTL_JWT, 10)});
            console.log('Índice TTL creado con éxito');
        } else {
            console.log('Índice TTL ya existe, no se ha creado nuevamente.');
        }

        const result = await col.insertOne(doc);
        return result;
    } catch (error) {
        console.log(`Ocurrió un error al intentar generar un token de sesión: ${error}`)
    }
};

const deleteOne = async (query) => {
    try {
        const result = await col.deleteMany(query);
        return result;
    } catch (error) {
        console.log(`Ocurrió un error al intentar borrar el token: ${error}`)
    }
};

module.exports = {
    getAll,
    getBy,
    create,
    deleteOne,
};