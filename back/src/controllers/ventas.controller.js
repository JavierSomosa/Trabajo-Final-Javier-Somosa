const { Venta, Producto, sequelize } = require("../models");

const crearVenta = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { nombre_cliente, productos } = req.body;

    // 1️⃣ Validaciones básicas
    if (!nombre_cliente || !productos || !Array.isArray(productos) || productos.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ mensaje: "Datos incompletos o inválidos" });
    }

    // Validar cantidades
    for (let item of productos) {
      if (!item.id || !item.cantidad || item.cantidad <= 0) {
        await transaction.rollback();
        return res.status(400).json({ mensaje: "Producto o cantidad inválida" });
      }
    }

    // 2️⃣ Buscar productos activos en BD
    const productosBD = await Producto.findAll({
      where: {
        id: productos.map(p => p.id),
        activo: true
      },
      transaction
    });

    // Verificar que existan todos los productos solicitados
    if (productosBD.length !== productos.length) {
      await transaction.rollback();
      return res.status(400).json({ mensaje: "Uno o más productos no existen o están inactivos" });
    }

    let total = 0;

    // 3️⃣ Calcular total correctamente
    productosBD.forEach(prod => {
      const prodCarrito = productos.find(p => p.id === prod.id);
      const precio = parseFloat(prod.precio); // DECIMAL viene como string
      total += precio * prodCarrito.cantidad;
    });

    // 4️⃣ Crear venta
    const venta = await Venta.create({
      nombre_cliente,
      total
    }, { transaction });

    // 5️⃣ Asociar productos con cantidad y precio unitario
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

    // 6️⃣ Devolver venta con productos incluidos
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