const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js")
const authMiddleware = require("../middlewares/auth.middleware.js")
const upload = require("../middlewares/upload.middleware");

router.get("/login", (req, res) => {
    res.render("login", { error: null});
});

const { mostrarDashboard, cargarProductoVista, 
    mostrarEditarProductoVista, actualizarProductosVista, 
    eliminarProductoVista, activarProductoVista, 
    mostrarRegistrosVista, exportarRegistros} = require("../controllers/admin.controller");

const{ verificarSesion } = require("../middlewares/auth.middleware.js")

const{ autentificarUsuario } = require("../controllers/auth.controller.js");

const validarProducto = require("../middlewares/validarProducto.js");

const { mostrarAsistenciaVista } = require("../controllers/admin.controller");

router.get("/dashboard", verificarSesion, mostrarDashboard);

// mostrar formulario nuevo producto
router.get("/productos/nuevo", verificarSesion, (req, res) => {
    res.render("nuevoProducto");
});
// crear producto
router.post("/productos", verificarSesion, upload.single("imagen"), validarProducto, cargarProductoVista);

// mostrar formulario editar
router.get("/productos/:id/editar", verificarSesion, mostrarEditarProductoVista);

// guardar edicion
router.post("/productos/:id/editar", verificarSesion, upload.single("imagen"), validarProducto, actualizarProductosVista);

router.post("/productos/:id/eliminar", verificarSesion, eliminarProductoVista);

router.post("/productos/:id/activar", verificarSesion, activarProductoVista);

router.get("/registros", verificarSesion, mostrarRegistrosVista);

router.get("/registros/exportar", verificarSesion, exportarRegistros);

router.get("/asistencia", verificarSesion, mostrarAsistenciaVista);

router.get("/logout", (req, res) =>{
    req.session.destroy((error) => {
    if (error) {
        return res.redirect('/admin/login');
    }else{
        return res.redirect('/admin/login');
    }
    });
})

router.post("/login", autentificarUsuario);


module.exports = router;