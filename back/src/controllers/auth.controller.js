// para que el usuario este validado
const Usuario = require('../models/Usuarios');
const bcrypt = require('bcryptjs');


const autentificarUsuario = async(req, res) =>{
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.render("login", { error: "Credenciales inválidas" })
        }

        const nuevoUsuario = await Usuario.findOne({ where: { email } })
        if(nuevoUsuario == null){
            return res.render("login", { error: "Credenciales inválidas" })
        }

        if (!nuevoUsuario.activo) {
            return res.render("login", { error: "Usuario inactivo" });
        }

        const contraseñaValidada = await bcrypt.compare(password, nuevoUsuario.password)

        if (!contraseñaValidada){
            return res.render("login", { error: "Credenciales inválidas" })
        }
        req.session.usuario = {
            id: nuevoUsuario.id,
            email: nuevoUsuario.email,
            rol: nuevoUsuario.rol
        }

        res.redirect("/admin/dashboard");

    }catch (error){
        console.log(error);
        return res.render("login", { error: "Error de autentificacion" })
    }
}

module.exports = {
    autentificarUsuario
}