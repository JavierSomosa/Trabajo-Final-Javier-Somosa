const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VentaProducto = sequelize.define("VentaProducto", {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
});

module.exports = VentaProducto;