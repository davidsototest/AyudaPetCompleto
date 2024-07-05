// Contiene rutas para gestionar usuarios, como obtener información del usuario, actualizar perfil, etc.
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControlle');
const userMiddleware = require('../middleware/loggerMiddleware')

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.get('/', userController.getUsers);
//router.post('/register', userController.register)
router.post('/login', userController.login)
router.delete('/:id', userMiddleware, (req, res, next) => {
    next()
}, userController.deleteUser)

<<<<<<< HEAD
=======

// Definir las rutas y asociarlas con los controladores correspondientes
// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
// router.delete('/:id', userController.deleteUser);

>>>>>>> 8a710f528c3154a17930c7a125c35ff15c53f02a
module.exports = router;