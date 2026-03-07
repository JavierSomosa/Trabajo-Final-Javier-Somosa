async function seedAdmin() {
  const bcrypt = require("bcryptjs");
  const { Usuario } = require("./src/models");

  const admin = await Usuario.findOne({
    where: { email: "admin@mail.com" }
  });

  if (!admin) {
    const hash = await bcrypt.hash("admin123", 10);

    await Usuario.create({
      email: "admin@mail.com",
      password: hash,
      rol: "admin",
      activo: true
    });

    console.log("✅ Admin creado: admin@mail.com");
  } else {
    console.log("ℹ️ Admin ya existe");
  }
}

module.exports = seedAdmin;