require('dotenv').config();

// variables de entorno
const host = process.env.HOST || "localhost";

// jwt
const jwt = require('jsonwebtoken');
const swagger_jwt_token = jwt.sign("swagger", process.env.JWT_TOKEN);
process.env.SWAGGER_JWT_TOKEN = swagger_jwt_token;

// swagger
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Chat API",
      version: "1.0.0"
    },
    components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: "bearer",
              bearerFormat: "JWT"
          }
      },
      persistAuthorization: true
    }
  },
  apis: [
    `./src/${process.env.VERSION}/routes/usuarioRoutes.js`,  
    `./src/${process.env.VERSION}/routes/mensajeRoutes.js` 
  ],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use(`/api/${process.env.VERSION}/`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Make our docs in JSON format available
  app.get(`/api/${process.env.VERSION}/json`, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Swagger Docs are available on http://${host}:${port}/api/${process.env.VERSION}/`
  );
};

module.exports = { swaggerDocs };