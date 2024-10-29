const express = require("express");
const router = express.Router();

// se importan los controladores
const {login, logout, createAccount} = require("../controllers/usuarioController");
const { authenticateToken } = require("../middleware/jwt");

// se crea cada ruta
/**
 * @openapi
 * /api/v1/usuarios/login:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Login de usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#definitions/UserLogin"
 *     responses:
 *       200:
 *         description: Metodo para iniciar la sesión de un usuario.
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
 *         description: Ocurrió un error al iniciar la sesión.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 * definitions:
 *     UserLogin: 
 *      type: object
 *      required:
 *          - email
 *          - password
 *      properties:
 *         email:
 *             type: string
 *             description: Email del usuario
 *             default: tyler.durden@mail.com
 *             example: tyler.durden@mail.com
 *         password:
 *             type: string
 *             description: Password del usuario
 *             default: 5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5
 *             example: 5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5
 */
router.post("/login", login);
/**
 * @openapi
 * /api/v1/usuarios/logout:
 *   post:
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     summary: Logout de usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#definitions/UserLogout"
 *     responses:
 *       200:
 *         description: Metodo para cerrar la sesión de un usuario.
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
 *         description: Ocurrió un error al cerrar la sesión.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 * definitions:
 *    UserLogout: 
 *      type: object
 *      required:
 *          - _id
 *      properties:
 *        _id:
 *             type: string
 *             description: ID único del usuario del usuario
 */
router.post("/logout", authenticateToken, logout);

/**
 * @openapi
 * /api/v1/usuarios/crear:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Crea un nuevo usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#definitions/User"
 *         
 *     responses:
 *       200:
 *         description: Metodo para iniciar la sesión de un usuario.
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
 *         description: Ocurrió un error al iniciar la sesión.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 * definitions:
 *    User: 
 *      type: object
 *      required:
 *          - name
 *          - password
 *          - email
 *      properties:
 *        nombre:
 *             type: string
 *             description: Nombre del usuario
 *             default: Tyler
 *             example: Tyler
 *        password:
 *             type: string
 *             description: Password del usuario
 *             default: 5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5
 *             example: 5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5
 *        email:
 *             type: string
 *             description: Email del usuario
 *             default: tyler.durden@mail.com
 *             example: tyler.durden@mail.com
 */
router.post("/crear", createAccount);

module.exports = router;