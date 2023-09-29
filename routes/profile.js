const express = require('express');

const { page } = require('../controllers/profile');

const router = express.Router();

router.get('/', page);

module.exports = router;