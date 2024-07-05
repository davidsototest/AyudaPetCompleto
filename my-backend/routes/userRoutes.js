// Contiene rutas para gestionar usuarios, como obtener información del usuario, actualizar perfil, etc.
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControlle');
const userMiddleware = require('../middleware/loggerMiddleware')

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);

//router.post('/register', userController.register)
router.post('/login', userController.login)
router.delete('/:id', userMiddleware, (req, res, next) => {
    next()
}, userController.deleteUser)


// Definir las rutas y asociarlas con los controladores correspondientes
// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
// router.delete('/:id', userController.deleteUser);

module.exports = router;