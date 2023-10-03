const postService = require('../service/posts')

const page = async (req, res) => {
    // console.log(req.session.userId)
    
    const posts = await postService.getPosts();
    res.render('../views/posts.ejs',{posts:posts});
    //TODO: add res.render to posts of user
    // res.render)
};

const createPost = async (req, res) => {
    try {
        const user = await postService.createPost(req.session.userId, req.body);
        res.json(user);
    }
    catch (error) {
        // 405 == Method Not Allowed
        res.status(405).json({message: error.message})
    }
        // res.error(error);
    
}

const increaseLike = async (req, res) => {
    try {
        const user = await postService.increaseLike(req.body);
        res.json(user);
    }
    catch (error) {
        // 405 == Method Not Allowed
        res.status(405).json({message: error.message})
    }
        // res.error(error);
    
}

module.exports = {
    page,
    createPost,
    increaseLike
}
