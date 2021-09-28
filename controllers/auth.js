const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario=require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
require


const login= async(req, res=response)=>{

    const{correo, password}=req.body;

    try {

        //verificar si el email existe
        const usuario= await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario/Pasword no son correctos - correo'
            })
        }

        //verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario/Pasword no son correctos - estado false'
            })
        }

        //verificar la contraseña, hace match, regresa booleano
        // const validPassword= bcryptjs.compareSync(password, usuario,password);
        // if(!validPassword){
        //     return res.status(400).json({
        //         msg: 'Usuario/Pasword no son correctos - password mal'
        //     })
        // }

      //  generar el JWT
        const token = await generarJWT(usuario._id);



        res.json({
            usuario,
            token
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hablé con el administrador'
        })
        
    }
    
}

module.exports={
    login
}