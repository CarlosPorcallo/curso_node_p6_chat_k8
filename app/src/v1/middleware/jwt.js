
const jwt = require("jsonwebtoken");
const ObjectID = require("mongodb").ObjectId;
const tokenModel = require("../models/tokenModel");

const sendUnauthorizedResponse = (res) => {
    return res.status(403).json({ status: 403, message: "Acceso no autorizado" });
};

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return sendUnauthorizedResponse(res);
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const tokenExists = await checkTokenExists(decoded._id, token);
    if (tokenExists) {
      console.log("Token que usuario eliminó");
      return sendUnauthorizedResponse(res);
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log("token no valido o expirado");
    return sendUnauthorizedResponse(res);
  }
};

const checkTokenExists = async (id, token) => {
    try {
      const query = {
        _id: new ObjectID(id)
      };

      const result = await tokenModel.getBy(query, {});
      return result ? result.token === token : false;
    } catch (error) {
      console.error(`Error al verificar la existencia del token: ${error}`);
      return false;
    }
  };

module.exports = {
  authenticateToken,
};
