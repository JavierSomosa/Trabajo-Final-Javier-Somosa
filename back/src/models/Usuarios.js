const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Usuario = sequelize.define("Usuario", {

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

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
