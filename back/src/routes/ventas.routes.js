const express = require("express");
const router = express.Router();
const ventasController = require("../controllers/ventas.controller");
const validarVenta = require("../middlewares/validarVenta");

// Crear una venta
router.post("/", validarVenta, ventasController.crearVenta);

module.exports = router;
