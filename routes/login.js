const express = require('express');

const { page, createUser, loginUser } = require('../controllers/login');

const router = express.Router();

router.get('/', page);
router.post('/signup', createUser);
router.post('/login', loginUser);

module.exports = router;