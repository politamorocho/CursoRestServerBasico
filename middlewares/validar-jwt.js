const jwt = require('jsonwebtoken');
const { response, request } = require('express');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'no hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETEORPRIVATEKEY)

        const usuario = await Usuario.findById(uid);
        //si usuario no existe
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en bd'
            })
        }

        //verificar si uid tienes estado true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado false'
            })
        }

        req.usuario = usuario;
        //req.uid=uid;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }



   // console.log(token);


}

module.exports = {
    validarJWT
}