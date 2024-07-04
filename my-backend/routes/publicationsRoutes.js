
// Contiene rutas para gestionar las publicaciones
const express = require('express');
const router = express.Router();
const publicationsController = require('../controllers/publicationsController');

router.get('/', publicationsController.getAllPublications);
router.get('/:id', publicationsController.getPublicationById);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const publicationController = require('../controllers/publicationsController');
// const publicationMiddleware = require('../middleware/loggerMiddleware')

// const db = require('../config/dbConfig')

// router.get('/', publicationController.getAllPublications);
// router.get('/:id', publicationController.getPublicationById);
// router.post('/', publicationController.createPublication);
// router.put('/:id', publicationController.updatePublication);
// router.put('/publications/:publicationId/comment/:commentId', publicationController.updateComment);
// router.delete('/:id', publicationMiddleware, (req, res, next) => {
//     next()
// }, publicationController.deletePublication);
// router.delete('/:publicationId/comment/:id', publicationMiddleware, (req, res, next) => {
//     next()
// }, publicationController.deleteComment)

// module.exports = router;
