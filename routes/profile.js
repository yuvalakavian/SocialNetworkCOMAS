const express = require('express');

const { page, uploadProfilePicHandler, deleteProfile } = require('../controllers/profile');

const router = express.Router();

router.get('/', page);
router.post('/upload-profile-picture', uploadProfilePicHandler);
router.delete('/deleteProfile', deleteProfile);


module.exports = router;