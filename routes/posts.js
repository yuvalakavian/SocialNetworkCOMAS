const express = require('express');

const { page, createPost, increaseLike, deletePost } = require('../controllers/posts');
const router = express.Router();

router.get('/', page);
router.post('/post', createPost);
router.post('/like', increaseLike);
router.delete('/deletePost',deletePost);


module.exports = router;