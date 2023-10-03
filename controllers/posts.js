const postService = require('../service/posts')
const userService = require('../service/users')

const page = async (req, res) => {
    // console.log(req.session.userId)
    
    const posts = await postService.getPosts();
    const user = await userService.getUser(req.session.userId)
    res.render('../views/posts.ejs',{posts:posts,user:user});
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

const deletePost = async (req, res) => {
    try {
        const user = await postService.deletePost(req.body);
        res.json(user);
    }
    catch (error) {
        // 405 == Method Not Allowed
        res.status(405).json({message: error.message})
    }
        // res.error(error);   
}

const createComment = async (req, res) => {
    try {
        const user = await postService.createComment(req.body);
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
    increaseLike,
    deletePost,
    createComment
}
