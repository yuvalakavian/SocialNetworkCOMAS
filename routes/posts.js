const express = require('express');

const { page, createPost, increaseLike, createComment } = require('../controllers/posts');
const router = express.Router();

router.get('/', page);
router.post('/post', createPost);
router.post('/like', increaseLike);
router.post('/comment', createComment);

module.exports = router;