const mongoose = require('mongoose');
const { commentsSchema } = require('./comment');

const postsSchema = new mongoose.Schema({
  likes: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    enum: ['video', 'image', 'text'],
    required: true
  },
  comments: [commentsSchema]
});

const Posts = mongoose.model('Post', postsSchema);

module.exports = Posts;
