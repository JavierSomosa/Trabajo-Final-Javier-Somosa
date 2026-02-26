const {Producto} = require('../models');

const crearProducto = async (req, res) => {
    try {
        const {nombre, precio, categoria, imagen, activo} = req.body;

        // Validación básica
        if (!nombre || !precio || !categoria) {
        return res.status(400).json({ mensaje: "Datos incompletos" });
        }

        const nuevoProducto = await Producto.create({
        nombre,
        precio,
        categoria,
        imagen: imagen || null,
        activo: activo !== undefined ? activo : true // Por defecto, el producto es activo
        });
        res.status(201).json({
        mensaje: "Producto creado correctamente",
        producto: nuevoProducto
        });

    }catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear el producto" });
    }
};

const obtenerProductos = async (req, res) => {
  try {

    const { categoria } = req.query;

    const where = { activo: true };

    if (categoria) {
      where.categoria = categoria;
    }

    const productos = await Producto.findAll({ where });

    res.json(productos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener productos" });
  }
};

const editarProducto = async (req, res) => {
    try{
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await producto.update(req.body);

        res.status(200).json({
        mensaje: "Producto actualizado correctamente",
        producto: producto
        });

    }catch (error){
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar el producto" });
    }

}

const desactivarProducto = async (req, res) => {
    try{
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await producto.update({activo:false});

        res.status(200).json({
        mensaje: "Producto desactivado correctamente",
        producto: producto
        });
    }catch (error){
        console.error(error);
        res.status(500).json({ mensaje: "Error al desactivar el producto" });
    }
}

const activarProducto = async (req, res) => {
    try{
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await producto.update({activo:true});

        res.status(200).json({
        mensaje: "Producto activado correctamente",
        producto: producto
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ mensaje: "Error al desactivar el producto" });
    }
}

const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await producto.update({
            activo: false
        });

        res.json({ mensaje: "Producto dado de baja correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar producto" });
    }
};

const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findOne({
        where: {
            id,
            activo: true
        }
        });

        if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json(producto);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener producto" });
    }
};

module.exports = {
    crearProducto,
    obtenerProductos,
    editarProducto,
    desactivarProducto,
    activarProducto,
    eliminarProducto,
    obtenerProductoPorId
};