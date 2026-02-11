// Importamos los tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Importamos la conexión a la base de datos
const sequelize = require("../config/database");

// Definimos el modelo Usuario (administrador del sistema)
const Usuario = sequelize.define("Usuario", {

  // Email del administrador
  // Es único y obligatorio
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  // Contraseña del administrador
  // Se guarda encriptada (bcrypt)
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  rol: {
    type: DataTypes.STRING,
    defaultValue: 'admin'
  },
  
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }

});

module.exports = Usuario;
