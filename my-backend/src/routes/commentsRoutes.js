const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

const db = require('../config/dbConfig');
const verifyToken = require('../middleware/loggerMiddleware');

router.post('/:publicationId', verifyToken, commentsController.createComment);
router.get('/:publicationId', commentsController.getCommentPublication);

module.exports = router;