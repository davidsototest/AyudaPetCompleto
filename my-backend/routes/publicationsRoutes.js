const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publicationsController');

router.post('/', publicationController.createPublication);
router.put('/:id', publicationController.updatePublication);
router.put('/publications/:publicationId/comment/:commentId', publicationController.updateComment);

module.exports = router;
