const profileService = require('../service/profile')

const page = async (req, res) => {
    const myUser = await profileService.getCurrentUser(req.session.userId);
    res.render("../views/profile.ejs", { myUser })
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
