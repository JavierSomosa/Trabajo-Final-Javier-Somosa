const Encuesta = require("../models/encuesta");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

const crearEncuesta = async (req, res) => {
    try {
        const { opinion, email, acepta_promos, puntuacion } = req.body;

        if (!opinion)
        return res.status(400).json({ error: "Opinión inválida" });

        if (!email)
        return res.status(400).json({ error: "Email requerido" });

        if (!puntuacion)
        return res.status(400).json({ error: "Puntuación requerida" });

        const imagen = req.file ? req.file.filename : null;

        await Encuesta.create({
        opinion,
        email,
        acepta_promos: !!req.body.acepta_promos,
        puntuacion,
        imagen
        });

        res.json({ mensaje: "Encuesta guardada" });

    } catch (error) {
        if (error.name === "SequelizeValidationError") {
          return res.status(400).json({
              error: error.errors[0].message
          });
        }

        console.log(error);
        res.status(500).json({ error: "Error al guardar encuesta" });
    }
};

module.exports = { crearEncuesta, upload };