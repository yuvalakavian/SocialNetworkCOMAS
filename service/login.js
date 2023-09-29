const User = require('../models/user');

const createUser = async (userData) => {
    console.log("user", userData)
    if (!userData || !userData.email || !userData.firstName || !userData.lastName || !userData.country || !userData.city || !userData.streetAddress || !userData.password) {
        console.error('Invalid user data. All fields are required.');
        return null;
    }

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        console.error('Email address is already registered.');
        return null;
    }

    const newUser = new User(userData);

    try {
        await newUser.save();
        console.log('User created successfully:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
};

module.exports = createUser;
