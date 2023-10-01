const express = require('express');

const { page } = require('../controllers/chat');
const { isAuthenticated } = require('../middleware/middlewareFunction')

const router = express.Router();

router.get('/', isAuthenticated(), page);

module.exports = router;