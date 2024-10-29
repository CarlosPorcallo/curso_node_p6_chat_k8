const jwt = require("jsonwebtoken");
const ObjectID = require("mongodb").ObjectId;

// modelos
const userModel = require("../models/usuarioModel");

const createAccount = async (req, res) => {
    const userData = req.body;
    const defaultData = {
      role: "User"
    };
  
    if (userData.password === undefined || userData.password === "") userData.password = process.env.DEFAULT_USER_PASSWORD;
  
    const completeUserData = { ...defaultData, ...userData };
    const promise = userModel.save(completeUserData);
    promise.then(insertResult => {
      if (insertResult) {
        res.status(201).send({
          status: 201,
          message: "Usuario creado con éxito"
        });
      }
    }).catch(err => {
      if (err.message.includes("existe")) {
        res.status(409).send({
          status: 409,
          message: err.message,
        });
      } else {
        res.status(500).send({
          status: 500,
          message: "Ocurrió un error al intentar crear el usuario",
        });
      }
    });
  };

const login = (req, res) => {
    const { email, password } = req.body;
    const query = {
      email: email,
      password: password,
    };
    const options = {
      projection: { password: 0 },
    };
    const user = userModel.get(query, options);
    user.then((user_data) => {
      if (user_data && user_data.length !== 0) {
        const jwt_bearer = jwt.sign(
          { 
            id: user_data["_id"], 
            role: user_data["role"] 
          },
          process.env.JWT_TOKEN,
          {
            expiresIn: process.env.TTL_JWT_STR,
          }
        );
        res.status(200).send({
          status: 200,
          data: user_data,
          jwt: jwt_bearer,
        });
      } else {
        res.status(403).send({
          status: 403,
          message: "Nombre de usuario o contraseña incorrectos",
        });
      }
    });
  };
  
const logout = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const userId = new ObjectID(req.body._id);
  
    try {
      const remainingTime = getTokenRemainingTime(token);
      if (remainingTime > 0) {
        const doc = { _id: userId, token };
        await createTemporaryToken(doc, remainingTime);
      }
      return res
        .status(200)
        .send({ status: 200, message: "Sesión cerrada correctamente" });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message:
          "Ocurrió un error al generar el token temporal, inténtelo más tarde",
      });
    }
  };

  const getTokenRemainingTime = (token) => {
    try {
      const decoded = jwt.decode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const remainingTime = decoded.exp - currentTime;
      return remainingTime > 0 ? remainingTime : 0;
    } catch (error) {
      console.error(`Error al decodificar el token: ${error}`);
      return 0;
    }
  };
  
  const createTemporaryToken = async (doc, remainingTime) => {
    try {
      const expiration = new Date();
      expiration.setSeconds(expiration.getSeconds() + remainingTime);
  
      doc.expiration = expiration;
      await userModel.save(doc, remainingTime);
    } catch (error) {
      console.error(`Ocurrió un error al intentar cerrar sesión: ${error}`);
    }
  };

  module.exports = {
    createAccount,
    login,
    logout
  };