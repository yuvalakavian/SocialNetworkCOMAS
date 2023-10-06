const mongoose = require('mongoose');
const { Comments } = require('./comment');
const User = require('./user');
const Group = require('./group');

const postsSchema = new mongoose.Schema({
  likes: {
    type: Number,
    default: 0
  },
  groupID:{ // if nil : don't return on posts page
    type: mongoose.Schema.Types.ObjectId,
    ref: Group,
    required: false,
  },
  videoLink:{
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  comments: {
    type: [Comments],
    default: [],
  },
},
{
  timestamps:true
},
  // contentType: {
  //   type: String,
  //   enum: ['video', 'image', 'text'],
  //   required: true
  // },
);

const Posts = mongoose.model('Post', postsSchema);

module.exports = Posts;
