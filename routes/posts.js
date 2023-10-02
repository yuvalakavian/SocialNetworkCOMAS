const express = require('express');

const { page, createPost, increaseLike } = require('../controllers/posts');
const router = express.Router();

router.get('/', page);
router.post('/post', createPost);
router.post('/like', increaseLike);


module.exports = router;