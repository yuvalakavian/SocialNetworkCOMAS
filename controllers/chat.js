const chatService = require('../service/chat')

const page = (req, res) => {
    res.render("../views/chat/index.ejs");
};

module.exports = {
    page
}
