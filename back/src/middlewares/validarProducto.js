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

    // si es producto nuevo necesita imagen
    if (!req.file && !req.params.id) {
        return res.status(400).json({ error: "La imagen es obligatoria" });
    }

    next();
};

module.exports = validarProducto;