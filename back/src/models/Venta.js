const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Venta = sequelize.define("Venta", {
  nombre_cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },

  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

  // Total de la venta
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }

});

module.exports = Venta;
