const { fn, col, literal } = require("sequelize");
const Venta = require("../models/Venta");
const VentaProducto = require("../models/ventaProducto");
const Producto = require("../models/Producto");
const Log = require("../models/logs");
const Usuario = require("../models/Usuarios");

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

    const logs = await Log.findAll({
        include: {
            model: Usuario,
            attributes: ["email"]
        },
        order: [["fecha", "DESC"]],
        limit: 20
    });

    const totalFacturacion = await Venta.sum("total");

    const totalProductosActivos = await Producto.count({
        where: { activo: true }
    });

    res.render("registros", {
      ventasMasCaras,
      productosMasVendidos,
      logs,
      totalFacturacion,
      totalProductosActivos
    });

  } catch (error) {
    console.error(error);
    res.redirect("/admin/dashboard");
  }
};

const exportarRegistros = async (req, res) => {
  try {

    const ventasMasCaras = await Venta.findAll({
      order: [["total", "DESC"]],
      limit: 10
    });

    const productosMasVendidos = await VentaProducto.findAll({
      attributes: [
        "producto_id",
        [fn("SUM", col("cantidad")), "total_vendido"]
      ],
      include: [{ model: Producto, attributes: ["nombre"] }],
      group: ["VentaProducto.producto_id", "Producto.id"],
      order: [[literal("total_vendido"), "DESC"]],
      limit: 10
    });

    const logs = await Log.findAll({
      include: { model: Usuario, attributes: ["email"] },
      order: [["fecha", "DESC"]],
      limit: 20
    });

    let csv = "";

    // 🔹 Ventas más caras
    csv += "TOP 10 VENTAS MÁS CARAS\n";
    csv += "ID;Cliente;Total\n";

    ventasMasCaras.forEach(v => {
      csv += `${v.id};${v.nombre_cliente};${v.total}\n`;
    });

    csv += "\n";

    // 🔹 Productos más vendidos
    csv += "TOP 10 PRODUCTOS MÁS VENDIDOS\n";
    csv += "Producto;Cantidad Vendida\n";

    productosMasVendidos.forEach(p => {
      csv += `${p.Producto ? p.Producto.nombre : "Sin nombre"};${p.dataValues.total_vendido}\n`;
    });

    csv += "\n";

    // 🔹 Logs
    csv += "LOGS DE INICIO DE SESIÓN\n";
    csv += "Usuario;Fecha;Acción\n";

    logs.forEach(l => {
      csv += `${l.Usuario.email};${new Date(l.fecha).toLocaleString()};${l.accion}\n`;
    });

    // BOM para Excel
    csv = "\uFEFF" + csv;

    res.header("Content-Type", "text/csv; charset=utf-8");
    res.attachment("registros.csv");
    return res.send(csv);

  } catch (error) {
    console.error(error);
    res.redirect("/admin/registros");
  }
};

module.exports= {
    mostrarDashboard,
    cargarProductoVista,
    mostrarEditarProductoVista,
    actualizarProductosVista,
    eliminarProductoVista,
    activarProductoVista,
    mostrarRegistrosVista,
    exportarRegistros
}