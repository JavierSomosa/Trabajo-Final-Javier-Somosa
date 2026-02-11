const Usuario = require('../models/Usuarios');
const bcrypt = require('bcryptjs');

const crearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

                //es para mezclar la contraseña
    const hash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      email,
      password: hash
    });

    res.status(201).json({
      message: 'Usuario creado correctamente',
      usuario
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearUsuario
};