const User = require('../models/user');

const authenticationCheck = ()  => (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    }
    else{
        res.render("../views/login.ejs");
    }
}

const createUser = async (userData) => {
    
    if (existingUser) {
        console.error('User is already registered.')
        throw new Error('User is already registered.')
    }
    
    userData.password = hashHandler(userData.password)
    userData.profilePicture = await profilePictureHandler(userData.firstName, userData.lastName)

    const newUser = new User(userData);

    try {
        await newUser.save()
        console.log('User created successfully:', newUser)
        return newUser
    } catch (error) {
        console.error(`Error creating user: ${error.message}`)
        throw new Error(`Error creating user: ${error.message}`)
    }
};

const isAdmin = ()  => async (req, res, next) => {
    if (req.session && req.session.userId) {
        const existingUser = await User.findOne({ _id: req.session.userId, isAdmin: true })
        if (existingUser) {
            next();
        } 
        else{
            res.render("../views/403.ejs");
        }
    }
    else{
        res.render("../views/login.ejs");
    }
}


module.exports = { 
    authenticationCheck,
    isAdmin
};