const express = require("express");
const router = express.Router();
const usuariosController = require ("../controllers/usuarios.controller");
const validarUsuario = require("../middlewares/validarUsuario");

router.post("/crear", validarUsuario, usuariosController.crearUsuario)

module.exports = router;

