const express = require('express');

const { page, getUsers, addFriend, removeFriend, getUser } = require('../controllers/users')

const router = express.Router();

router.get('/', page);
router.get('/get-user', getUser);
router.get('/search-users', getUsers);
router.post('/add-friend', addFriend);
router.post('/remove-friend', removeFriend);

module.exports = router;