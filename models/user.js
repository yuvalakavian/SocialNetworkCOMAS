const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        require: true
    },
    country: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);