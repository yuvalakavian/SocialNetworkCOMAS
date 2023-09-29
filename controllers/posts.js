const postService = require('../service/chat')

const page = (req, res) => {
    res.render('../views/posts/index.ejs');
};

module.exports = {
    page
}
