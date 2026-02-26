const express = require("express");
const { sequelize } = require("./src/models");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware para JSON
app.use(express.json());
//para los formularios html
app.use(express.urlencoded({ extended: true }));
//motor de vistas
app.set("view engine", "ejs");
//para las imagenes
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
//para cors
app.use(cors());
//para el front
app.use(express.static(path.join(__dirname, "../front")));

app.use(session({
  secret: "super_secreto_tp",
  resave: false,
  saveUninitialized: false
}));

// 👉 IMPORTAR RUTAS
const productosRoutes = require("./src/routes/productos.routes");
const usuariosRoutes = require("./src/routes/usuarios.routes");
const adminRoutes = require("./src/routes/admin.routes");
const ventasRoutes = require("./src/routes/ventas.routes");
const encuestaRoutes = require("./src/routes/encuesta.routes");

// 👉 USAR RUTAS
app.use("/api/productos", productosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/admin", adminRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/encuestas", encuestaRoutes);

// Sincronizar BD
sequelize.sync({ alter: true })
  .then(() => console.log("🟢 BD sincronizada"))
  .catch(err => console.error(err));

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});