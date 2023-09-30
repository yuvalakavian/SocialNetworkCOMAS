const express = require('express');

const { logoutHandler } = require('../controllers/logout');

const router = express.Router();

router.get('/', logoutHandler);

module.exports = router;