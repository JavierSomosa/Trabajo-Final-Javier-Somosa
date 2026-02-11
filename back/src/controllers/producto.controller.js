const {Producto} = require('../models');

//req → lo que manda el cliente

//res → lo que vos respondés
const crearProducto = async (req, res) => {
    try {
        const {nombre, precio, tipo, imagen, activo} = req.body;

        // Validación básica
        if (!nombre || !precio || !tipo) {
        return res.status(400).json({ mensaje: "Datos incompletos" });
        }

        const nuevoProducto = await Producto.create({
        nombre,
        precio,
        tipo,
        imagen: imagen || null, // Si no se envía imagen, se guarda como null
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
        //// 1. Pedimos a la base de datos TODOS los productos
        const productos = await Producto.findAll();

        
        // 2. Respondemos al cliente con status 200 (OK)
        res.status(200).json({
            productos: productos
        });
    } catch (error) {
        // 3. Si algo falla (BD, Sequelize), atrapamos el error
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener los productos"});
    }
};

const editarProducto = async (req, res) => {
    try{
        // 1. Obtener el id desde la URL
        const { id } = req.params;

        // 2. Buscar el producto en la base de datos
        const producto = await Producto.findByPk(id);

        // 3. Si no existe, devolver error 404
        if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        // 4. Actualizar solo los campos que vengan en el body
        await producto.update(req.body);

        // 5. Responder con éxito
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

module.exports = {
    crearProducto,
    obtenerProductos,
    editarProducto,
    desactivarProducto,
    activarProducto
};