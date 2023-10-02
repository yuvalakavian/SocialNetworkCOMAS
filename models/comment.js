const mongoose = require('mongoose');
const Users = require('./user');

const commentsSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
},
{
    timestamps:true
});