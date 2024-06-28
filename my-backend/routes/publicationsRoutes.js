// Contiene rutas para gestionar las publicaciones
const express = require('express');
const router = express.Router();
const publicationsController = require('../controllers/publicationsController');

router.get('/', publicationsController.getAllPublications);
router.get('/:id', publicationsController.getPublicationById);

module.exports = router;