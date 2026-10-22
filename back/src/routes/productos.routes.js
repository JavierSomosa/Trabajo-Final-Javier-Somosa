const express = require("express");
const router = express.Router();
const { Producto } = require("../models");

const { crearProducto, obtenerProductos,
    editarProducto, desactivarProducto,
    activarProducto, eliminarProducto, obtenerProductoPorId} = require("../controllers/producto.controller");
const validarProducto = require("../middlewares/validarProducto");

router.get("/", obtenerProductos);
router.post("/", validarProducto, crearProducto);
router.put("/:id/editar", editarProducto);

router.put("/:id/desactivar", desactivarProducto);

router.put("/:id/activar", activarProducto);

router.put("/:id/eliminar", eliminarProducto);

router.get("/:id", obtenerProductoPorId);

module.exports = router;