const express = require('express');

const { page, getUserFriends, getChat, createNewChat } = require('../controllers/chat');

const router = express.Router();

router.get('/', page);
router.post('/:userId', createNewChat)
router.get('/friends', getUserFriends);
router.get('/:userId', getChat);


module.exports = router;