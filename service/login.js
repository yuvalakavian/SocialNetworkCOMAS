const User = require('../models/user');

const createUser = async (userData) => {
    console.log("user", userData)
    // Validate user data
    if (!userData || !userData.email || !userData.firstName || !userData.lastName || !userData.country || !userData.city || !userData.streetAddress || !userData.password) {
        console.error('Invalid user data. All fields are required.');
        return null; // Or throw an error if you prefer
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        console.error('Email address is already registered.');
        return null; // Or throw an error if you prefer
    }

    // Create a new user instance
    const newUser = new User(userData);

    // Save the user to the database
    try {
        await newUser.save();
        console.log('User created successfully:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        return null; // Or handle the error appropriately based on your use case
    }
};

module.exports = createUser;
