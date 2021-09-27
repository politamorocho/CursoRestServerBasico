const { response } = require('express');


const usersGet = (req, res = response) => {

    const query=req.query;

    res.json({
        ok: 'true',
        msg: 'get Api - controlador',
        query
    })
}


const usersPut = ((req, res = response) => {

    const id=req.params.id;

    res.json({
        ok: 'true',
        msg: 'put Api -  controlador',
        id
    })
})

const usersPost = ((req, res = response) => {
    const {nombre, edad}=req.body;

    res.status(201).json({
        ok: 'true',
        msg: 'post Api -  controlador',
        nombre, edad
    })
})

const usersDelete = ((req, res = response) => {
    res.json({
        ok: 'true',
        msg: 'delete Api'
    })
})

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}