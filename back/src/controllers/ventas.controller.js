const { Venta, Producto } = require("../models");

const crearVenta = async (req, res) => {
  try {
    const { nombre_cliente, productos } = req.body;

    // Validación básica
    if (!nombre_cliente || !productos || productos.length === 0) {
      return res.status(400).json({ mensaje: "Datos incompletos" });
    }

    let total = 0;

    // Traemos los productos reales desde la BD
    const productosBD = await Producto.findAll({
      where: {
        id: productos.map(p => p.id),
        activo: true
      }
    });

    // Calculamos el total
    productosBD.forEach(prod => {
      const prodCarrito = productos.find(p => p.id === prod.id);
      total += prod.precio * prodCarrito.cantidad;
    });

    // Creamos la venta
    const venta = await Venta.create({
      nombre_cliente,
      total
    });

    // Asociamos productos a la venta
    for (let prod of productosBD) {
      const prodCarrito = productos.find(p => p.id === prod.id);

      await venta.addProducto(prod, {
        through: {
          cantidad: prodCarrito.cantidad,
          precio_unitario: prod.precio
        }
      });
    }

    res.status(201).json({
      mensaje: "Venta creada correctamente",
      venta
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la venta" });
  }
};

module.exports = {
  crearVenta
};
