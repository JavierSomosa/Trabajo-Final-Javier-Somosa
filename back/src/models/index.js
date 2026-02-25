const sequelize = require("../config/database");

const Producto = require("./Producto");
const Venta = require("./Venta");
const Usuario = require("./Usuarios");
const VentaProducto = require("./ventaProducto");
const Log = require("./logs");

Venta.belongsToMany(Producto, {
  through: VentaProducto,
  foreignKey: "venta_id"
});

Producto.belongsToMany(Venta, {
  through: VentaProducto,
  foreignKey: "producto_id"
});

VentaProducto.belongsTo(Producto, {
  foreignKey: "producto_id"
});

VentaProducto.belongsTo(Venta, {
  foreignKey: "venta_id"
});

Usuario.hasMany(Log, {
  foreignKey: "usuario_id"
});

Log.belongsTo(Usuario, {
  foreignKey: "usuario_id"
});

module.exports = {
  sequelize,
  Producto,
  Venta,
  Usuario
};
