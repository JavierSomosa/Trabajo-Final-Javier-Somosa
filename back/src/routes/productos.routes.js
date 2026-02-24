const express = require("express");
const router = express.Router();
const { Producto } = require("../models");

// Importamos las funciones del controller
const { crearProducto, obtenerProductos, editarProducto, desactivarProducto, activarProducto, eliminarProducto } = require("../controllers/producto.controller");
const validarProducto = require("../middlewares/validarProducto");

// GET /api/productos → obtener todos los productos
router.get("/", obtenerProductos);

// POST /api/productos → crear un producto (esto ya lo tenías)
router.post("/", validarProducto, crearProducto);

//PUT /api/productos → edita el producto
router.put("/:id/editar", editarProducto);

router.put("/:id/desactivar", desactivarProducto);

router.put("/:id/activar", activarProducto);

router.put("/:id/eliminar", eliminarProducto);

module.exports = router;