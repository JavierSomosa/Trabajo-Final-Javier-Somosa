const express = require("express");
const router = express.Router();
const usuariosController = require ("../controllers/usuarios.controller");

router.post("/", usuariosController.crearUsuario)

module.exports = router;

