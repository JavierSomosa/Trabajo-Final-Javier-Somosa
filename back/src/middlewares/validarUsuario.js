const validarUsuario = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Email inválido" });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    next();
};

module.exports = validarUsuario;
