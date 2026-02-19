const Producto = require('../models/Producto');

const mostrarDashboard = async(req, res) =>{
    try{
        const productos = await Producto.findAll();

        res.render("dashboard", { productos });

    }catch(error){
        console.error(error);
        res.status(500).json({ mensaje: "Error al mostrar los producto" });
    }
}

const cargarProductoVista = async(req, res) =>{
    try{
        const { nombre, precio, tipo, activo} = req.body;

        if (!nombre || !precio || !tipo) {
            return res.render("nuevoProducto", {
                error: "Datos incompletos"
            });
        }

        await Producto.create({
            nombre,
            precio,
            tipo,
            imagen: req.file ? req.file.filename : null,
            activo
        });

        res.redirect("/admin/dashboard");
    }catch(error){
        console.error(error);
        res.render("nuevoProducto",
        { error: "Error al crear los producto" });
    }
}

const mostrarEditarProductoVista = async(req, res) =>{
    try{
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
        return res.redirect("/admin/dashboard");
        }

        res.render("editarProducto", { producto });
    }catch(error){
        console.error(error);
        res.redirect("/admin/dashboard");
    }

}

const actualizarProductosVista = async(req, res) =>{
    try{
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
        return res.redirect("/admin/dashboard");
        }

        const { nombre, precio, tipo } = req.body;

        const activo = req.body.activo ? true : false;

        await producto.update({
            nombre,
            precio,
            tipo,
            imagen: req.file ? req.file.filename : producto.imagen,
            activo
        });

        res.redirect("/admin/dashboard");
    }catch(error){
        
    }
}

module.exports= {
    mostrarDashboard,
    cargarProductoVista,
    mostrarEditarProductoVista,
    actualizarProductosVista
}