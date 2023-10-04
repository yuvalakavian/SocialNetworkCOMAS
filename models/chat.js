const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        sentBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        value: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const chatSchema = new Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [messageSchema]
});

module.exports = mongoose.model('Chat', chatSchema);