const crypto = require('crypto');

const User = require('../models/user');

const hashHandler = (password) => {
    const sha256hash = crypto.createHash('sha256');
    sha256hash.update(password);
    const hashedPassword = sha256hash.digest('hex');
    return hashedPassword
}

const createUser = async (userData) => {
    if (!userData || !userData.email || !userData.firstName || !userData.lastName || !userData.country || !userData.city || !userData.streetAddress || !userData.password) {
        console.error('Invalid user data. All fields are required.')
        throw new Error('Invalid user data. All fields are required.')
    }

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        console.error('User is already registered.')
        throw new Error('User is already registered.')
    }
    
    userData.password = hashHandler(userData.password)

    const newUser = new User(userData);

    try {
        await newUser.save();
        console.log('User created successfully:', newUser);
        return newUser;
    } catch (error) {
        console.error(`Error creating user: ${error.message}`);
        throw new Error(`Error creating user: ${error.message}`)
    }
};

const loginUser = async (userData) => {
    const hashedPassword = hashHandler(userData.password)
    
    const existingUser = await User.findOne({ email: userData.email, password: hashedPassword });    
    if (existingUser) {
        console.log(existingUser._id)
        return existingUser._id
    }
    else{
        // console.log("Not correct creds")
        throw new Error('The user or password is incorrect')
    }
}

module.exports = {
    createUser,
    loginUser
};
