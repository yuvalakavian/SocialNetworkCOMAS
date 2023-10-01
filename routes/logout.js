const express = require('express');

const { logoutHandler } = require('../controllers/logout');
const { isAuthenticated } = require('../middleware/middlewareFunction')

const router = express.Router();

router.get('/', isAuthenticated(), logoutHandler);

module.exports = router;