
const dbValidators = require('../helpers/db-validators')
const generarJWT = require('../helpers/generarJWT')
const googleVerify = require('../helpers/google-verify')
const subirArchivo = require('../helpers/subir-archivo')


module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}