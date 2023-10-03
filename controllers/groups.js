const userService = require('../service/groups')

const page = async (req, res) => {
    console.log(req.session.userId)
    res.render('../views/groups/index.ejs', {userId: req.session.userId});
};

const getGroups = async (req, res) => {
    try {
        const users = await userService.getGroups(req.body);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

const searchGroups = async (req, res) => {
    try {
        const user = await userService.searchGroups(req.session.userId);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
    
}

const addGroups = async (req, res) => {
    try {
        const users = await userService.addGroups(req.session.userId, req.body.friendId);
        res.json(users);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

const removeGroups = async (req, res) => {
    try {
        const users = await userService.removeGroups(req.session.userId, req.body.friendId);
        res.json(users);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    page,
    getGroups,
    searchGroups,
    addGroups,
    removeGroups
}
