const Role = require('../models/role');

const Usuario = require('../models/usuario');


const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`el  rol ${rol} no está`)
    }
}

const existeEmail = async (correo = '') => {

    const mailExiste = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`el correo : ${correo} ya esta registrado`)
    }

}

const existeUsuarioPorID = async (id = '') => {

    const existeUsuario= await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`el  id: ${id} no existe`)
    }

}


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorID
}

