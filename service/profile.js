// TODO: implement profile service 
const User = require('../models/user');

const getCurrentUser = async (userId) => {
    try {
        const currentUser = await User.findOne({ _id: userId })
        return currentUser
    } catch (error) {
        throw new Error(`Error finding user : ${error.message}`)
    }
}

const deleteProfile = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (user) {
            console.log('User deleted successfully:', user);
            return user;
        }
    } catch (error) {
        console.error(`Error deleting user: ${error.message}`);
        throw new Error(`Error deleting user: ${error.message}`);
    }
};

const handleUpload = async (userId, userData) => {
    const currentUser = await User.findOne({ _id: userId })
    
    try {
        currentUser.profilePicture = userData.content
        await currentUser.save()
        console.log('Saved new profile image to user:', currentUser)
        return currentUser
    } catch (error) {
        console.error(`Error Saving new profile image : ${error.message}`)
        throw new Error(`Error Saving new profile image : ${error.message}`)
    }
}

module.exports = {
    getCurrentUser,
    handleUpload,
    deleteProfile
};