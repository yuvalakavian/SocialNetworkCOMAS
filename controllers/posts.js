const postService = require('../service/chat')

const page = (req, res) => {
    console.log(req.session.userId)
    res.render('../views/posts/index.ejs');
};

module.exports = {
    page
}
