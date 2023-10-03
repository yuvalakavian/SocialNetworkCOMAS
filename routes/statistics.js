const express = require('express');

const { page, getPopularCities, getLikesPerWeek, getPostsPerWeek } = require('../controllers/statistics');

const router = express.Router();

router.get('/', page);
router.get('/getPopularCities', getPopularCities);
router.get('/getLikesPerWeek', getLikesPerWeek);
router.get('/getPostsPerWeek', getPostsPerWeek);

module.exports = router;