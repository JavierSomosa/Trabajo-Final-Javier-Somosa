const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Encuesta = sequelize.define("Encuesta", {

  opinion: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  acepta_promos: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  puntuacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  },

  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  }

}, {
  timestamps: true // guarda createdAt automáticamente
});

module.exports = Encuesta;