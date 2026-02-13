const verificarSesion = async(req, res, next) => {
    if (req.session.usuario && req.session.usuario.rol == "admin"){
        next()
    }else{
        res.redirect("/admin/login");
    }

}

module.exports = {
    verificarSesion
}