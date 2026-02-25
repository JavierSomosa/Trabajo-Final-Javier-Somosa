const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Log = sequelize.define("Log", {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  accion: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Log;