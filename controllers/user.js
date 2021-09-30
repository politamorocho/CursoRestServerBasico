const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usersGet = async (req = request, res = response) => {

    // const query = req.query;
    const { limite = 5, desde = 0 } = req.query;

    //query para extraer solo los que tienen estado true
    const query={estado:true};
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments();
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
        
    })
}


const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //validar contra db
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json(usuario)
}

const usersPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //verificar correo


    //hash contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);


    //guardar db
    await usuario.save();
    console.log(usuario);

    res.json({
        usuario
    });
}

const usersDelete =  async (req, res = response) => {
    
    const {id}=req.params;
    
   // vino de validar
    const uid=req.uid;

    //borrar fisicamente
    //const usuario= await Usuario.findByIdAndDelete(id);

    const usuario= await  Usuario.findByIdAndUpdate(id, {estado:false},{new:true});
   // const usuarioAutenticado= req.usuario;

    res.json({
        usuario,
       // uid
    })
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}