const loginService = require('../service/login')

const page = (req, res) => {
    res.render("../views/login.ejs");
};

const createUser = async (req, res) => {
    try {
        const user = await loginService.createUser(req.body);
        res.json(user);
    }
    catch (error) {
        res.error(error);
    }
    
}

const loginUser = async (req, res) => {
    try {
        const id = (await loginService.loginUser(req.body));
        
        // Keeping user session 
        req.session.userId = id.toString();

        // Return response to client
        // res.json(id)        
        return res.status(200).json(id);

    }
    catch (error) {
        console.log(error)
        console.log("pp")
        
        // 403 == forbidden
        res.status(403).json({message: error.message})
    }
}


module.exports = {
    page,
    createUser, 
    loginUser
}
