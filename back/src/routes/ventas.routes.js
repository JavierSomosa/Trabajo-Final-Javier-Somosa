const express = require("express");
const router = express.Router();
const ventasController = require("../controllers/ventas.controller");

// Crear una venta
router.post("/", ventasController.crearVenta);

module.exports = router;
