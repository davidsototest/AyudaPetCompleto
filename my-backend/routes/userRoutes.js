// Contiene rutas para gestionar usuarios, como obtener información del usuario, actualizar perfil, etc.
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControlle');

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);


// Definir las rutas y asociarlas con los controladores correspondientes
// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;