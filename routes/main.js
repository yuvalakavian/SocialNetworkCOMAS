const express = require('express');

const { page } = require('../controllers/main');

const router = express.Router();

router.get('/', page);

module.exports = router;