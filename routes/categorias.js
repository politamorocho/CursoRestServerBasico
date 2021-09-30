const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
    obtenerCategorias, 
    obtenerCategoriaID, 
    actualizarCategoria, 
    borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorID } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRol } = require('../middlewares')


const router = Router();

//apunta a {{url}}/api/categorias

//Obtener todas las categorias  - publico
router.get('/', obtenerCategorias);


//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'no es id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
],obtenerCategoriaID )

//Crear una categoria - publico - cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria )

//actualizar categoria por id - privado- con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], actualizarCategoria )


//borrar categoria admin
router.delete( '/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'no es id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
] , borrarCategoria )





module.exports = router;

