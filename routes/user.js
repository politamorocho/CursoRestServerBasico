const { Router } = require('express');
const { check } = require('express-validator');

const Role = require('../models/role');
const { usersGet, usersPost, usersDelete, usersPut } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, existeEmail, existeUsuarioPorID } = require('../helpers/db-validators');

const router = Router();

router.get('/', usersGet)

router.put('/:id',
    [
        check('id', 'no id valido').isMongoId(),
        check('id').custom(existeUsuarioPorID),
        check('rol').custom(esRolValido),
        validarCampos
    ], usersPut)

router.post('/',
    [
        check('nombre', 'el nombre es obligatorio').not().isEmpty,
        check('password', 'el password debe tener mas de 6 letras').isLength({ min: 6 }),
        check('correo').custom(existeEmail),
        //check('rol', 'no es unrol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom(esRolValido),
        validarCampos

    ],
    usersPost)

router.delete('/:id',
    [
        check('id', 'no id valido').isMongoId(),
        check('id').custom(existeUsuarioPorID), 
        validarCampos
    ], 
    usersDelete)



module.exports = router;
