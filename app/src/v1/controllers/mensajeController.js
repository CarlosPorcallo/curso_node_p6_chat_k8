// importamos los métodos del modelo Mensaje
const { get, save } = require("../models/mensajeModel");

// importamos el socket
const { get_socket } = require("../lib/server");

const get_mensajes = (req, res) => {
    promise = get();
    promise.then(mensajes => res.send(mensajes, 200)).catch(err => {
        console.error("Ocurrió un error al intentar salvar el mensaje: ", err);
        res.sendStatus(500);
    });
};

const save_mensaje = (req, res) => {
    promise = save(req.body);
    promise.then(insertResult => {
        if (insertResult) {
            const io = get_socket();
            io.emit('mensaje', req.body);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }
    ).catch(err => {
        console.error("Ocurrió un error al intentar salvar el mensaje: ", err);
        res.sendStatus(500);
    });
};

module.exports = {
    get_mensajes,
    save_mensaje
};