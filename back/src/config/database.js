const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "autoservicio_tp",
  "root",
  "1234",
  {
    host: "localhost",
    dialect: "mysql"
  }
);

module.exports = sequelize;