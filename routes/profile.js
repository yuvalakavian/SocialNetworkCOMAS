const express = require('express');

const { page, uploadProfilePicHandler } = require('../controllers/profile');

const router = express.Router();

router.get('/', page);
router.post('/upload-profile-picture', uploadProfilePicHandler);


module.exports = router;