const logoutHandler = (req, res) => {
    if (req.session && req.session.userId) {    
        console.log(req.sessionStore.sessions)
        delete req.sessionStore.sessions[req.session.id]
        console.log(req.sessionStore.sessions)
        res.redirect("/");
    };
}

module.exports = {
    logoutHandler
}