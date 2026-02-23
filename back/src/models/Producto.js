// Importamos los tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Importamos la conexión a la base de datos
const sequelize = require("../config/database");

// Definimos el modelo Producto
// Esto crea la tabla "Productos" en MySQL
const Producto = sequelize.define("Producto", {

  // Nombre del producto (obligatorio)
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // Precio del producto (decimal, ideal para dinero)
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  // categoria de producto: juego o pelicula
  categoria: {
    type: DataTypes.ENUM("Juego", "Película"),
    allowNull: false
  },

  // Ruta o nombre del archivo de imagen
  imagen: {
    type: DataTypes.STRING
  },

  // Indica si el producto está activo o no
  // Por defecto se guarda en true
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }

});

module.exports = Producto;