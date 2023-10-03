const profileService = require('../service/profile')
const postService = require('../service/posts')

const page = async (req, res) => {
    const myUser = await profileService.getCurrentUser(req.session.userId);
    const posts = await postService.getPosts();
    // res.render('../views/posts/index.ejs',{posts:posts});
    res.render("../views/profile.ejs", { myUser: myUser,  posts:posts})
};

const uploadProfilePicHandler = (req,res) => {  
    try {
        profileService.handleUpload(req.session.userId, req.body);
        page(req,res);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
module.exports = {
    page,
    uploadProfilePicHandler
}
