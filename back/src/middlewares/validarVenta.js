const validarVenta = (req, res, next) => {

    const { nombre_cliente, productos } = req.body;

    // Validar nombre
    if (!nombre_cliente || typeof nombre_cliente !== "string" || nombre_cliente.trim().length < 2) {
        return res.status(400).json({
            mensaje: "Nombre de cliente inválido"
        });
    }

    // Validar productos
    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({
            mensaje: "Debe enviar al menos un producto"
        });
    }

    // Validar cada producto
    for (let producto of productos) {

        if (!producto.id || isNaN(producto.id)) {
            return res.status(400).json({
                mensaje: "ID de producto inválido"
            });
        }

        if (!producto.cantidad || isNaN(producto.cantidad) || producto.cantidad <= 0) {
            return res.status(400).json({
                mensaje: "Cantidad inválida"
            });
        }
    }

    next();
};

module.exports = validarVenta;