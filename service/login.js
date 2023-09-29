const User = require('../models/user');

const createUser = async (userData) => {
    console.log("user", userData)
    if (!userData || !userData.email || !userData.firstName || !userData.lastName || !userData.country || !userData.city || !userData.streetAddress || !userData.password) {
        console.error('Invalid user data. All fields are required.')
        throw new Error('Invalid user data. All fields are required.')
    }

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        console.error('Email address is already registered.')
        throw new Error('Email address is already registered.')
    }

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
    const existingUser = await User.findOne({ email: userData.email, password: userData.password });    
    if (existingUser) {
        console.log(existingUser._id)
        return existingUser._id
    }
    console.log("Not correct creds")
    throw new Error('The user or password is incorrect')
    
}

module.exports = {
    createUser,
    loginUser
};
