const ApiError = require('../api-error')
const userService = require('../services/user.service')
const staffService = require('../services/staff.service')

//POST [authen/signUp]
module.exports.signUp =  async (req, res, next ) =>{
    try {
        const data = req.body
        const user = new userService()
        const signUpResult = await user.signUp(data)
        res.status(200).json({
            status:200,
            message: signUpResult.message
        })
    } catch (error) {
        return next(new ApiError(500, "An error occurred while Signing up !!!"));
    }
}

//POST [authen/signIn]
module.exports.signIn =  async (req, res, next) =>{
    try {
        const data = req.body
        const user = new userService()
        const signInResult = await user.signIn(data)
        res.status(200).json(signInResult);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while Signing in !!!"));
    }
}

//POST [authen/staffSignIn]
module.exports.staffSignIn = async (req, res , next) =>{
    try {
        const data = req.body
        const staff = new staffService()
        const signInResult = await staff.signIn(data)
        res.status(200).json(signInResult);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while Signing in !!!"));
    }
}

//POST [authen/staffSignUp]
module.exports.staffSignUp = async (req, res, next) =>{
    try {
        const data = req.body
        const staff = new staffService()
        const signUpResult = await staff.signUp(data)
        res.status(200).json(signUpResult)
    } catch (error) {
        return next(new ApiError(500, "An error occurred while Signing up !!!"));
    }
}