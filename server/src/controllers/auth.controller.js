const user = require("../models/user.model")
const staff = require("../models/staff.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../api-error')
const userService = require('../services/user.service')

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
        return next(new ApiError("500", "An error occurred while Signing up !!!"));
    }
}

module.exports.signIn =  async (req, res, next) =>{
    try {
        const data = req.body
        const user = new userService()
        const signInResult = await user.signIn(data)
        res.status(200).json({
            status: 200,
            message: signInResult.message,
        });
    } catch (error) {
        return next(new ApiError("500", "An error occurred while Signing in !!!"));
    }
}

module.exports.staffSignIn = () =>{

}

module.exports.staffSignUp = () =>{

}