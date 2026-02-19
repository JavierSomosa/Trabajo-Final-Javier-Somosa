const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js")
const authMiddleware = require("../middlewares/auth.middleware.js")
const upload = require("../middlewares/upload.middleware");

router.get("/login", (req, res) => {
    res.render("login", { error: null});
});

const { mostrarDashboard, cargarProductoVista, mostrarEditarProductoVista, actualizarProductosVista} = require("../controllers/admin.controller");
const{ verificarSesion } = require("../middlewares/auth.middleware.js")
const{ autentificarUsuario } = require("../controllers/auth.controller.js")

router.get("/dashboard", verificarSesion, mostrarDashboard);

//es solo para mostrar la pantalla
router.get("/productos/nuevo", verificarSesion, (req, res) => {
    res.render("nuevoProducto");
});
//para hacer el post si el admin quiere crear un producto
router.post("/productos", verificarSesion, upload.single("imagen"), cargarProductoVista);

//para hacer el edit si el admin quiere crear un producto
router.get("/productos/:id/editar", verificarSesion, mostrarEditarProductoVista);

//para enviar el formulario de edicion
router.post("/productos/:id/editar", verificarSesion, upload.single("imagen"), actualizarProductosVista);

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