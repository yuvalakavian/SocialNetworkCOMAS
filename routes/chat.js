const express = require('express');

const { page, getUserFriends } = require('../controllers/chat');

const router = express.Router();

router.get('/', page);
router.get('/friends', getUserFriends);

module.exports = router;