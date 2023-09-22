const express = require('express');

const { page } = require('../controllers/chat');

const router = express.Router();

router.get('/', page);

module.exports = router;