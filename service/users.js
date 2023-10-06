const User = require('../models/user');

const getUser = async ({ id }) => {

    try {
        const user = await User.findOne(id);

        return user;
    } catch (error) {
        console.error(`Error fetching users: ${error.message}`);
        throw new Error(`Error fetching users: ${error.message}`)
    }
};

const getUsers = async ({ searchValue }) => {

    try {
        const users = await User.find({
            $or: [
                { "firstName": { $regex: searchValue, $options: 'i' } },
                { "lastName": { $regex: searchValue, $options: 'i' } },
            ]
        });

        return users;
    } catch (error) {
        console.error(`Error fetching users: ${error.message}`);
        throw new Error(`Error fetching users: ${error.message}`)
    }
};

const addFriend = async (userId, friendId) => {
    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            console.error('User or friend not found');
        } else {
            user.friends.push(friendId);
            friend.friends.push(userId);

            await user.save();
            await friend.save();

            console.log('User and friend updated:', user, friend);
        }
    } catch (error) {
        console.error(`Error adding friend: ${error.message}`);
        throw new Error(`Error adding friend: ${error.message}`);
    }
};

const removeFriend = async (userId, friendId) => {
    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            console.error('User or friend not found');
        } else {
            user.friends.remove(friendId);
            friend.friends.remove(userId);

            await user.save();
            await friend.save();

            console.log('User and friend updated:', user, friend);
        }
    } catch (error) {
        console.error(`Error removing friend: ${error.message}`);
        throw new Error(`Error removing friend: ${error.message}`);
    }
};


module.exports = {
    getUsers,
    addFriend,
    getUser,
    removeFriend
};