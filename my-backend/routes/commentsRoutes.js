const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

const db = require('../config/dbConfig');
const verifyToken = require('../middleware/loggerMiddleware');

router.post('/publications/:publicationId/comment/', verifyToken, commentsController.createComment);

module.exports = router;