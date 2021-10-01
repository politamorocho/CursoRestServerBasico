const validaCampos = require('../middlewares/validar-campos');
const validaJWT = require('../middlewares/validar-jwt');
const validaRol = require('../middlewares/validar-roles');
const validarArchivo = require('../middlewares/validar-archivo')


// ... operadorexpress
module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRol,
    ...validarArchivo

}

