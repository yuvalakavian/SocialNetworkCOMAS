const chatService = require('../service/chat')

const page = (req, res) => {
    res.render("../views/chat/index.ejs");
};

const getUserFriends = async (req, res) => {
    try {
        const friends = await chatService.getUserFriends(req.session.userId)
        res.json(friends);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    page,
    getUserFriends
}
