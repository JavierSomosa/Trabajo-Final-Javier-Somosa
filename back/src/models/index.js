const sequelize = require("../config/database");

const Producto = require("./Producto");
const Venta = require("./Venta");
const Usuario = require("./Usuarios");
const VentaProducto = require("./ventaProducto");

Venta.belongsToMany(Producto, {
  through: VentaProducto,
  foreignKey: "venta_id"
});

Producto.belongsToMany(Venta, {
  through: VentaProducto,
  foreignKey: "producto_id"
});

module.exports = {
  sequelize,
  Producto,
  Venta,
  Usuario
};
