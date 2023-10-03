const express = require('express');

const { page, getPopularCities } = require('../controllers/statistics');

const router = express.Router();

router.get('/', page);
router.get('/getPopularCities', getPopularCities);

module.exports = router;