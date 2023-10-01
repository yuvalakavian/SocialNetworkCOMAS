const authenticationCheck = ()  => (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    }
    else{
        res.render("../views/login.ejs");
    }
}

module.exports = { authenticationCheck };