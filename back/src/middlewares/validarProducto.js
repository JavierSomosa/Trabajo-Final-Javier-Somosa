const validarProducto = (req, res, next) => {
    const { nombre, precio, categoria, activo } = req.body;

    if (!nombre || typeof nombre !== "string") {
        return res.status(400).json({ error: "Nombre inválido" });
    }

    if (!precio || isNaN(precio) || Number(precio) <= 0) {
        return res.status(400).json({ error: "Precio inválido" });
    }

    if (!categoria) {
        return res.status(400).json({ error: "Categoría requerida" });
    }

    if (!req.file && activo) {
    return res.status(400).json({ error: "La imagen es obligatoria" });
}

    next();
};

module.exports = validarProducto;