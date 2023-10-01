const express = require('express');

const { firstPageHandler, createUser, loginUser } = require('../controllers/login');

const router = express.Router();

router.get('/', firstPageHandler);
router.post('/signup', createUser);
router.post('/login', loginUser);

module.exports = router;