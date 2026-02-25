const { fn, col, literal } = require("sequelize");
const Venta = require("../models/Venta");
const VentaProducto = require("../models/ventaProducto");
const Producto = require("../models/Producto");

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
        const { nombre, precio, categoria} = req.body;

        if (!nombre || !precio || !categoria) {
            return res.render("nuevoProducto", {
                error: "Datos incompletos"
            });
        }

        const activo = req.body.activo ? true : false;

        console.log("REQ.BODY:", req.body);
        console.log("ACTIVO CALCULADO:", req.body.activo ? true : false);

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

const activarProductoVista = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).send("Producto no encontrado");
        }

        if (!producto.imagen) {
            return res.send("No se puede activar un producto sin imagen");
        }

        producto.activo = true;
        await producto.save();

        res.redirect("/admin/dashboard");

    } catch (error) {
        console.error(error);
        res.status(500).send("Error al activar producto");
    }
};

const mostrarRegistrosVista = async (req, res) => {
  try {

    // 🔥 Top 10 ventas más caras
    const ventasMasCaras = await Venta.findAll({
      order: [["total", "DESC"]],
      limit: 10
    });

    // 🔥 Top 10 productos más vendidos
    const productosMasVendidos = await VentaProducto.findAll({
      attributes: [
        "producto_id",
        [fn("SUM", col("cantidad")), "total_vendido"]
      ],
      include: [
        {
          model: Producto,
          attributes: ["nombre"]
        }
      ],
      group: ["producto_id", "Producto.id"],
      order: [[literal("total_vendido"), "DESC"]],
      limit: 10
    });

    res.render("registros", {
      ventasMasCaras,
      productosMasVendidos
    });

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
    eliminarProductoVista,
    activarProductoVista,
    mostrarRegistrosVista
}