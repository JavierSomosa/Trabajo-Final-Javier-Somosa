const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js")
const authMiddleware = require("../middlewares/auth.middleware.js")

router.get("/login", (req, res) => {
    res.render("login", { error: null});
});

router.get("/dashboard", authMiddleware.verificarSesion, (req, res) => {
    res.render("dashboard");
});

router.get("/logout", (req, res) =>{
    req.session.destroy((error) => {
    if (error) {
        return res.redirect('/admin/login');
    }else{
        return res.redirect('/admin/login');
    }
    });
})

router.post("/login", authController.autentificarUsuario);

module.exports = router;