const postService = require('../service/posts')

const page = (req, res) => {
    console.log(req.session.userId)
    res.render('../views/posts/index.ejs');
};

module.exports = {
    page
}
