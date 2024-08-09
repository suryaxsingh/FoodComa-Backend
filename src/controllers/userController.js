//const { model } = require("mongoose");
const UserRepository = require("../repositories/userRepository");
const UserService = require("../services/userService");

 async function createUser(req, res) {
    console.log("Create user Controller called");
    console.log(req.body)
    
    const userService = new UserService(new UserRepository());
    try {
        const response = await userService.registerUser(req.body);
        return res.json({
            message: 'Successfully registered the user',
            success: true,
            data: response,
            error: {}
        });    
    } catch(error) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.reason,
            data: {},
            error: error
        })
    }
   
}

module.exports = {
    createUser
}