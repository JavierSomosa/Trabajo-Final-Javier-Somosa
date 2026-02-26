const { Sequelize } = require("sequelize");

//http://localhost:3000/

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