const express = require('express');

const { page } = require('../controllers/posts')

const router = express.Router();

router.get('/', page);


module.exports = router;