const profileService = require('../service/profile')
const postService = require('../service/posts')

const page = async (req, res) => {
    const myUser = await profileService.getCurrentUser(req.session.userId);
    const posts = await postService.getPosts();
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

const deleteProfile = async (req, res) => {
    try{
        const user = await profileService.deleteProfile(req.session.userId);
        res.status(201).send(user);
    } catch (error) {
        res.render("../views/400.ejs")
    }
};

module.exports = {
    page,
    uploadProfilePicHandler,
    deleteProfile
}
