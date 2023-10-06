const express = require('express');

const { page, getUserFriends, getChat, createNewChat, sendMessage } = require('../controllers/chat');

const router = express.Router();

router.get('/', page);
router.get('/friends', getUserFriends);
router.get('/:userId', getChat);
router.post('/message', sendMessage)
router.post('/:userId', createNewChat)

module.exports = router;