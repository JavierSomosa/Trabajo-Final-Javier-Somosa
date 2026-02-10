const sequelize = require("../config/database");

const Producto = require("./Producto");
const Venta = require("./Venta");
const Usuario = require("./Usuarios");

// Relación muchos a muchos entre Venta y Producto
    //Una venta tiene muchos productos
        //|
Venta.belongsToMany(Producto, {
  through: "ventas_productos",
  foreignKey: "venta_id"
});

Producto.belongsToMany(Venta, {
//Sequelize crea la tabla intermedia
  through: "ventas_productos",
//Claves foráneas
  foreignKey: "producto_id"
});

module.exports = {
  sequelize,
  Producto,
  Venta,
  Usuario
};
