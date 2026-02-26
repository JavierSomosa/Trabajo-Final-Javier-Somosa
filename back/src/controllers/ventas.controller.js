const { Venta, Producto, sequelize } = require("../models");

const crearVenta = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { nombre_cliente, productos } = req.body;

    if (!nombre_cliente || !productos || !Array.isArray(productos) || productos.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ mensaje: "Datos incompletos o inválidos" });
    }

    for (let item of productos) {
      if (!item.id || !item.cantidad || item.cantidad <= 0) {
        await transaction.rollback();
        return res.status(400).json({ mensaje: "Producto o cantidad inválida" });
      }
    }

    const productosBD = await Producto.findAll({
      where: {
        id: productos.map(p => p.id),
        activo: true
      },
      transaction
    });

    if (productosBD.length !== productos.length) {
      await transaction.rollback();
      return res.status(400).json({ mensaje: "Uno o más productos no existen o están inactivos" });
    }

    let total = 0;

    productosBD.forEach(prod => {
      const prodCarrito = productos.find(p => p.id === prod.id);
      const precio = parseFloat(prod.precio);
      total += precio * prodCarrito.cantidad;
    });

    const venta = await Venta.create({
      nombre_cliente,
      total
    }, { transaction });

    for (let prod of productosBD) {
      const prodCarrito = productos.find(p => p.id === prod.id);

      await venta.addProducto(prod, {
        through: {
          cantidad: prodCarrito.cantidad,
          precio_unitario: parseFloat(prod.precio)
        },
        transaction
      });
    }

    await transaction.commit();

    const ventaCompleta = await Venta.findByPk(venta.id, {
      include: Producto
    });

    res.status(201).json({
      mensaje: "Venta creada correctamente",
      venta: ventaCompleta
    });

  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la venta" });
  }
};

module.exports = {
  crearVenta
};