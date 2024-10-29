// se importa el server y el socket
const { get_app, get_server, get_socket } = require("./src/v1/lib/server");
// se importa body-parser
const bodyParser = require("body-parser");
// se importa e instancía dotenv
require('dotenv').config();

app = get_app()
// puerto de la aplicación
const port_server = process.env.PORT_SERVER;
const port_socket = process.env.PORT_SOCKET;
// versión de la aplicación
const version =  process.env.VERSION;
const host =  process.env.HOST;
// token JWT
process.env.JWT_TOKEN = require('crypto').randomBytes(64).toString('hex');

// instanciamos body-parsercl
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// swagger
const { swaggerDocs: SwaggerDocs } = require(`./src/swagger`);

// se importan las rutas de la API
const mensajeRoutes = require(`./src/${version}/routes/mensajeRoutes`);
const usuarioRoutes = require(`./src/${version}/routes/usuarioRoutes`);
// se setean las rutas de la API
app.use(`/api/${version}/mensajes`, mensajeRoutes);
app.use(`/api/${version}/usuarios`, usuarioRoutes);
// entrypoint swagger
app.get("/api", (req, res) => {
    res.writeHead(301, { Location: `http://${host}:${port_server}/api/${version}/` });
    res.end();
});

// se ejecuta el server (estáticos y socket.io)
const server = get_server()
server.listen(port_socket, () => {
    // eventos de socket.io
    const io = get_socket();
    io.on("connection", () => console.log("Un usuario esta conectado."));
    io.on("connect_error", () => console.log("Ocurrió un error al intentar levantar el socket."));
    io.on("disconnect", () => console.log("Un usuario esta desconectado."));
    console.log(`Socket listo y escuchando en http://localhost:${port_socket}`);
});

// se ejecuta express (API)
app.listen(port_server, () => {
    console.log(`Server listo y escuchando en http://localhost:${port_server}`);
    SwaggerDocs(app, port_server);
});
