// Importamos los tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Importamos la conexión a la base de datos
const sequelize = require("../config/database");

// Definimos el modelo Venta
const Venta = sequelize.define("Venta", {

  // Nombre del cliente que hizo la compra
  nombre_cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // Fecha de la venta
  // Sequelize la completa automáticamente
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
