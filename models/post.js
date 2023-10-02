const mongoose = require('mongoose');
const { commentsSchema } = require('./comment');
const User = require('./user');

const postsSchema = new mongoose.Schema({
  likes: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  }
},
{
  timestamps:true
},
  // contentType: {
  //   type: String,
  //   enum: ['video', 'image', 'text'],
  //   required: true
  // },
  // comments: [commentsSchema]
);

const Posts = mongoose.model('Post', postsSchema);

module.exports = Posts;
