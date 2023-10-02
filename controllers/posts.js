const postService = require('../service/posts')

const page = (req, res) => {
    res.render('../views/posts/index.ejs');
};

module.exports = {
    page
}
