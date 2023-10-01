const express = require('express');

const { firstPageHandler, createUser, loginUser } = require('../controllers/login');
const { isAuthenticated } = require('../middleware/middlewareFunction')

const router = express.Router();

router.get('/', isAuthenticated(), firstPageHandler);
router.post('/signup', isAuthenticated(),createUser);
router.post('/login', isAuthenticated(), loginUser);

module.exports = router;