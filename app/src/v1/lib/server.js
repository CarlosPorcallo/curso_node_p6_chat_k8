// se importa express
const express = require("express");
const http = require("http");
const fs = require("fs");
// se importa el soporte para cors
const cors = require("cors");
// se importa e instancía dotenv
require('dotenv').config();

const version = process.env.VERSION;
// se importa socket.io
const socketIo = require("socket.io");
// se instancía el servidor express
let app;
// se instancian nuestros servers para el socket
let server;
let io;

const get_app = () => {
    if (app === undefined) {
        console.log("Se crea una nueva instancia del server");
        app = express();
        app.use(cors());
        // se instancía socket.io
        console.log("Se crea un nuevo socket");
        server = http.createServer((req, res) => {
            switch(req.url) {
                case '/':
                    fs.readFile(`./src/${version}/views/index.html`, (err, data) => {
                        if (err) {
                            console.error("Ocurrió un error al intentar setear el archivo estático para ésta ruta: ", err)
                            res.end(500);
                        } else {
                            res.end(data);
                        }
                    });
                    break;
                case '/signup':
                    fs.readFile(`./src/${version}/views/usuarios/register.html`, (err, data) => {
                        if (err) {
                            console.error("Ocurrió un error al intentar setear el archivo estático para ésta ruta: ", err)
                            res.end(500);
                        } else {
                            res.end(data);
                        }
                    });
                    break;
                case '/login':
                    fs.readFile(`./src/${version}/views/usuarios/login.html`, (err, data) => {
                        if (err) {
                            console.error("Ocurrió un error al intentar setear el archivo estático para ésta ruta: ", err)
                            res.end(500);
                        } else {
                            res.end(data);
                        }
                    });
                    break;
                default:
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/plain");
                    res.end("Recurso no encontrado!!!\n");
            }

        });
        io = socketIo(server);
    } else {
        console.log("Ya existe una instancia de server previamente creada");
    }
    return app;
};

const get_socket = () => {
    if (io === undefined) {
        get_app();
    } else {
        console.log("Ya existe un socket");
    }
    return io;
}

const get_server = () => {
    if (server === undefined) {
        get_app();
    } else {
        console.log("Ya existe un server");
    }
    return server;
}

// se exporta para poder usarlo en todo el proyecto
module.exports = {
    get_app,
    get_server,
    get_socket
}