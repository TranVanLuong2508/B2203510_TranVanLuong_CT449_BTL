const ApiError = require('../api-error')
const userService = require('../services/user.service')
const staffService = require('../services/staff.service')

//POST [authen/signup]
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
        console.log(error)
        return next(new ApiError(500, "An error occurred while Signing up !!!"));
    }
}

//POST [authen/signin]
module.exports.signIn =  async (req, res, next) =>{
    try {
        const data = req.body
        const user = new userService()
        const signInResult = await user.signIn(data)
        res.status(200).json(signInResult);
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "An error occurred while Signing in !!!"));
    }
}

//POST [authen/staffsignin]
module.exports.staffSignIn = async (req, res , next) =>{
    try {
        const data = req.body
        const staff = new staffService()
        const signInResult = await staff.signIn(data)
        res.status(200).json(signInResult);
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "An error occurred while Signing in !!!"));
    }
}

//POST [authen/staffsignup]
module.exports.staffSignUp = async (req, res, next) =>{
    try {
        const data = req.body
        const staff = new staffService()
        const signUpResult = await staff.signUp(data)
        res.status(200).json(signUpResult)
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "An error occurred while Signing up !!!"));
    }
}