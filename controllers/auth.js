const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario=require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');



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

const googleSignIn = async (req, res=response)=>{
 const {id_token} = req.body;

 try {
     const {nombre, img, correo} = await googleVerify(id_token);
    console.log({nombre, img, correo});
    
   let usuario = await Usuario.findOne({correo});

    if(!usuario){
        //si no existe hay que crearlo
        const data={
            nombre,
            correo,
            password: ':P',
            img,
            google:true,
            

        };
        usuario= new Usuario(data);
        await usuario.save();
    }

    //estado del usuario en bd
    if(!usuario.estado){
       return res.status(401).json({
            msg: 'hable con el admin, usted no existe'
        })
    }

   // generar jwt
    const token = await generarJWT(usuario.id);



    res.json({
        usuario,
        token
    })  

 } catch (error) {
    res.status(400).json({
        ok: false,
        msg: 'el token no se puede verificar'
    })

     
 }

 
}


module.exports={
    login,
    googleSignIn
}