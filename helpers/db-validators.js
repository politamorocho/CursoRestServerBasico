const { Categoria, Usuario, Producto} = require('../models');
const Role = require('../models/role');


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

//comprobar si existe categoria
const existeCategoriaPorID = async (id = '') => {

    const existeCategoria= await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`el  id: ${id} no existe`)
    }

}

const existeProductoPorID = async (id = '') => {

    const existeProducto= await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`el  id: ${id} no existe`)
    }

}

//validar coleccionesPermitidas
const coleccionesPermitidas =(coleccion ='', colecciones=[]) =>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`la coleccion: ${coleccion} no esta permitida. ${colecciones}`);
    }
        return true;

}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorID,
    existeCategoriaPorID,
    existeProductoPorID,
    coleccionesPermitidas
}

