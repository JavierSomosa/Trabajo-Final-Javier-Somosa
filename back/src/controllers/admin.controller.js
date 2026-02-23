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
        const { nombre, precio, categoria, activo} = req.body;

        if (!nombre || !precio || !categoria) {
            return res.render("nuevoProducto", {
                error: "Datos incompletos"
            });
        }

        await Producto.create({
            nombre,
            precio,
            categoria,
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

        const { nombre, precio, categoria } = req.body;

        const activo = req.body.activo ? true : false;

        await producto.update({
            nombre,
            precio,
            categoria,
            imagen: req.file ? req.file.filename : producto.imagen,
            activo
        });

        res.redirect("/admin/dashboard");
    }catch(error){
        console.error(error);
        res.redirect("/admin/dashboard");
    }
}

const eliminarProductoVista = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.redirect("/admin/dashboard");
        }

        await producto.update({
            activo: false
        });

        res.redirect("/admin/dashboard");

    } catch (error) {
        console.error(error);
        res.redirect("/admin/dashboard");
    }
};

module.exports= {
    mostrarDashboard,
    cargarProductoVista,
    mostrarEditarProductoVista,
    actualizarProductosVista,
    eliminarProductoVista
}