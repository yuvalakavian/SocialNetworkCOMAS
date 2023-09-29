const loginService = require('../service/login')

const page = (req, res) => {
    res.render("../views/login.ejs");
};

const createUser = (req, res) => {
    const user = loginService(req.body);
    res.json(user);
}

module.exports = {
    page,
    createUser
}
