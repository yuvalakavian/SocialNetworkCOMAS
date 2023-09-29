const profileService = require('../service/profile')

const page = (req, res) => {
    res.render("../views/profile/index.ejs");
};

module.exports = {
    page
}
