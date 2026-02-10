const express = require("express");
const { sequelize } = require("./src/models");

const app = express();

// Middleware para JSON
app.use(express.json());

// 👉 IMPORTAR RUTAS
const productosRoutes = require("./src/routes/productos.routes");

// 👉 USAR RUTAS
app.use("/api/productos", productosRoutes);

// Sincronizar BD
sequelize.sync({ alter: true })
  .then(() => console.log("🟢 BD sincronizada"))
  .catch(err => console.error(err));

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});