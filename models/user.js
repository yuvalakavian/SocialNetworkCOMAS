const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        require: true
    },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    streetAddress:{
        type: String,
        required: true
    },

    password: {
        type: String,
        require: true
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    }, 
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);