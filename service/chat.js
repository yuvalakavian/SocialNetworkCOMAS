const User = require("../models/user")

const getUserFriends = async (userId) => {
    const user = await User.findById(userId).populate('friends');
    if(!user) {
        throw Error("user does not exists")
    }
    return user?.friends || [];
}

module.exports = {
    getUserFriends
}