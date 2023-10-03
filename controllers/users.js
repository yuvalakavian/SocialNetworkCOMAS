const userService = require('../service/users')

const page = async (req, res) => {
    console.log(req.session.userId)
    res.render('../views/users/index.ejs', {userId: req.session.userId});
};

const getUsers = async (req, res) => {
    try {
        const { searchValue } = req.query;
        const users = await userService.getUsers({ searchValue });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.session.userId);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
    
}

const addFriend = async (req, res) => {
    try {
        const users = await userService.addFriend(req.session.userId, req.body.friendId);
        res.json(users);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

const removeFriend = async (req, res) => {
    try {
        const users = await userService.removeFriend(req.session.userId, req.body.friendId);
        res.json(users);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    page,
    getUsers,
    addFriend,
    getUser,
    removeFriend
}