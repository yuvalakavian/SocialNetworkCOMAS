const express = require('express');

const { page, getUsers, addFriend, getUser } = require('../controllers/users')

const router = express.Router();

router.get('/', page);
router.get('/get-user', getUser);
router.post('/search-users', getUsers);
router.post('/add-friend', addFriend);


module.exports = router;