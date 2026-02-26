// seed-admin.js
const sequelize = require("./src/config/database"); // tu conexión
const Usuario = require("./src/models/Usuarios");   // tu modelo
const bcrypt = require("bcryptjs");

async function crearAdmin() {
  try {
    // Sincroniza la base (crea tabla si no existe)
    await sequelize.sync();

    // Genera hash de la contraseña
    const hash = await bcrypt.hash("1234", 10);

    // Crea el admin
    const admin = await Usuario.create({
      email: "admin@mail.com",
      password: hash,
      rol: "admin"
    });

    console.log("✅ Admin creado:", admin.email);
    process.exit(); // termina el script
  } catch (error) {
    console.error(error);
  }
}

crearAdmin();