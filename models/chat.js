const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    message: {
        type: String,
        require: true
    },
    messageType: {
        type: String,
        enum: ['video', 'image', 'text'],
        required: true
    }
});

module.exports = mongoose.model('Chat', chatSchema);