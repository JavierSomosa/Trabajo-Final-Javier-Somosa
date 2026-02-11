const express = require("express");
const router = express.Router();
const { Producto } = require("../models");

// Importamos las funciones del controller
const { crearProducto, obtenerProductos, editarProducto, desactivarProducto, activarProducto } = require("../controllers/producto.controller");

// GET /api/productos → obtener todos los productos
router.get("/", obtenerProductos);

// POST /api/productos → crear un producto (esto ya lo tenías)
router.post("/", crearProducto);

//PUT /api/productos → edita el producto
router.put("/:id/editar", editarProducto);

router.put("/:id/desactivar", desactivarProducto);

router.put("/:id/activar", activarProducto);

module.exports = router;