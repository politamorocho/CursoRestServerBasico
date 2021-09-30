const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, 
    obtenerProductos, 
    obtenerProductoID, 
    actualizarProducto, 
    borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorID, existeProductoPorID } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRol } = require('../middlewares')


const router = Router();

//apunta a {{url}}/api/Productos

//Obtener todas las Productos  - publico
router.get('/', obtenerProductos);


//Obtener una Producto por id - publico
router.get('/:id', [
    check('id', 'no es id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
],obtenerProductoID )

//Crear una Producto - publico - cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('categoria', 'no es id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorID),
    validarCampos
], crearProducto )

//actualizar Producto por id - privado- con token valido
router.put('/:id', [
    validarJWT,
    //check('categoria', 'no es id de mongo').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], actualizarProducto )


//borrar Producto admin
router.delete( '/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'no es id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
] , borrarProducto )





module.exports = router;