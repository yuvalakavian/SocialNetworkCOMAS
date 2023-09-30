const loginService = require('../service/login')

const firstPageHandler = (req, res) => {
    // check if the session is already create for the user.
    if (req.session && req.session.userId) {    
        res.redirect("/posts");
    }
    else{
        res.render("../views/login.ejs");
    }
};

const createUser = async (req, res) => {
    try {
        const user = await loginService.createUser(req.body);
        res.json(user);
    }
    catch (error) {
        // 405 == Method Not Allowed
        res.status(405).json({message: error.message})
    }
        // res.error(error);
    
}

const loginUser = async (req, res) => {
    try {
        const id = (await loginService.loginUser(req.body));
        // Keeping user session 
        req.session.userId = id.toString();
        // Return response to client
        return res.status(200).json(id);
    }
    catch (error) {
        // 403 == forbidden
        res.status(403).json({message: error.message})
    }
}


module.exports = {
    firstPageHandler,
    createUser, 
    loginUser
}
