const validarEncuesta = (req, res, next) => {
    const { opinion, email, puntuacion } = req.body;

    if (!opinion || opinion.trim().length === 0) {
        return res.status(400).json({ error: "La opinión es obligatoria" });
    }

    if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Email inválido" });
    }

    if (!puntuacion || isNaN(puntuacion) || puntuacion < 1 || puntuacion > 10) {
        return res.status(400).json({ error: "La puntuación debe ser entre 1 y 10" });
    }

    next();
};

module.exports = validarEncuesta;
