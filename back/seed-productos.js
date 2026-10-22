require("dotenv").config();
const { Producto, sequelize } = require("./src/models");

const productos = [
  // JUEGOS
  { nombre: "God of War Ragnarök", precio: 59.99, categoria: "Juego", imagen: "god_of_war.jpg", activo: true },
  { nombre: "Red Dead Redemption 2", precio: 39.99, categoria: "Juego", imagen: "rdr2_steam.jpg", activo: true },
  { nombre: "GTA V", precio: 29.99, categoria: "Juego", imagen: "gta5.jpg", activo: true },
  { nombre: "Elden Ring", precio: 49.99, categoria: "Juego", imagen: "elden_ring.jpg", activo: true },
  { nombre: "Cyberpunk 2077", precio: 44.99, categoria: "Juego", imagen: "cyberpunk.jpg", activo: true },
  { nombre: "The Witcher 3", precio: 19.99, categoria: "Juego", imagen: "witcher3.jpg", activo: true },
  { nombre: "Call of Duty MW3", precio: 69.99, categoria: "Juego", imagen: "callofduty.jpg", activo: true },

  // PELÍCULAS
  { nombre: "Matrix", precio: 14.99, categoria: "Película", imagen: "matrix.jpg", activo: true },
  { nombre: "Interstellar", precio: 12.99, categoria: "Película", imagen: "interstellar.jpg", activo: true },
  { nombre: "Inception", precio: 11.99, categoria: "Película", imagen: "inception.jpg", activo: true },
  { nombre: "El Señor de los Anillos", precio: 15.99, categoria: "Película", imagen: "lotr.jpg", activo: true },
  { nombre: "Batman: The Dark Knight", precio: 13.99, categoria: "Película", imagen: "batman.jpg", activo: true },
  { nombre: "Pulp Fiction", precio: 10.99, categoria: "Película", imagen: "pulpfiction.jpg", activo: true },
  { nombre: "Avengers", precio: 14.99, categoria: "Película", imagen: "avengers.jpg", activo: true },
  { nombre: "Dune", precio: 16.99, categoria: "Película", imagen: "dune.jpg", activo: true },
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la BD");

    for (const p of productos) {
      const existe = await Producto.findOne({ where: { nombre: p.nombre } });
      if (!existe) {
        await Producto.create(p);
        console.log(`✅ Creado: ${p.nombre}`);
      } else {
        console.log(`ℹ️  Ya existe: ${p.nombre}`);
      }
    }

    console.log("\n✅ Seed de productos completado");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

seed();
