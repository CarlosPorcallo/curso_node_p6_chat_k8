const express = require("express");
const router = express.Router();

// jwt
const { authenticateToken } = require("../middleware/jwt");

// se importan los controladores
const {get_mensajes, save_mensaje} = require("../controllers/mensajeController")

// se crea cada ruta
/**
 * @openapi
 * /api/v1/mensajes/mensaje:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene los mensajes.
 *     tags:
 *       - Mensajes
 *     responses:
 *       200:
 *         description: Metodo para obtener todos los mensajes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *       500:
 *         description: Ocurrió un error al obtener los mensajes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string 
 *                   example: "Ocurrió un error al obtener los mensajes"
 */
router.get("/mensaje", authenticateToken, get_mensajes);

/**
 * @openapi
 * /api/v1/mensajes/mensaje:
 *  post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Mensajes
 *     summary: Crea un mensaje.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#definitions/Message"             
 *     responses:
 *       200:
 *         description: Metodo para guardar un mensaje.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *       500:
 *         description: Ocurrió un error al guardar el mensaje
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string 
 *                   example: "Ocurrió un error al guardar el mensaje"
 * 
 * definitions:
 *    Message:
 *       type: object
 *       required:
 *          - nombre
 *          - mensaje
 *       properties:
 *         nombre:
 *               type: string
 *               description: Nickname del usuario
 *               default: tyler
 *               example: tyler
 *         mensaje:
 *               type: string
 *               description: Mensaje a enviar al chat
 *               default: "Hola Mundo"
 *               example: "Hola Mundo"   
 */
router.post("/mensaje", authenticateToken, save_mensaje);

module.exports = router;