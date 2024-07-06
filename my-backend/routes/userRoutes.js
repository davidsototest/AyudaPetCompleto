
// Contiene rutas para gestionar usuarios, como obtener información del usuario, actualizar perfil, etc.
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControlle");
const userMiddleware = require("../middleware/loggerMiddleware");

router.post("/", userController.createUser); //Crear usuario
router.put("/:id", userController.updateUser); //actualziar datos del usuario
router.post("/loginUser", userController.loginUser); //loguear usuario
router.delete("/deleteUser", userController.deleteUser); //dar de baja usuario
router.get("/userCount", userController.getUsersCount); //saber la cantidad de usuarios registrados
router.get('/', userController.getUsers);

module.exports = router;
