const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Producto = sequelize.define("Producto", {

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  categoria: {
    type: DataTypes.ENUM("Juego", "Película"),
    allowNull: false
  },

  imagen: {
    type: DataTypes.STRING
  },

  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }

});

module.exports = Producto;