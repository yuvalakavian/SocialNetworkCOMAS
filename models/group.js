const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');
const Post = require('./post');

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posts: [Post],
    members: [User],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    }
});

module.exports = mongoose.model('Group', groupSchema);