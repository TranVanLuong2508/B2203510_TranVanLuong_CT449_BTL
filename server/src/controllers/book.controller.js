const bookService = require('../services/book.service')
const jwt = require('jsonwebtoken')
const ApiError = require('../api-error')


function verifyToken (req, res) {
    const token = req.headers['authorization']
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || 'B2203510_CT449_HKI2024-2025', (error, user) => {
            if( error || !user.ChucVu) {
                return reject('Unauthorized !')
            }
            else {
                resolve(user)
            }
        }) 
    })
}

module.exports.getAll = async (req, res, next) =>{
    try {
        const bookservice = new bookService()
        const result = await bookservice.getAll()
        res.json(result)
    } catch (error) {
        return next( new ApiError(500, "An error occurred while getAll books !")
        )
    }
}


module.exports.add =  async (req, res, next) =>{
    if(!req.body.TenSach) {
        return next( new ApiError(400, "Book name can not be empty!"))
    }
    try {
        await verifyToken(req, res) 
        const bookservice = new bookService()
        const result = await bookservice.add(req.body)
        res.json(result)
    } catch (error) {
        if(error == 'Unauthorized !') {
            return next( new ApiError(401,error))
        }
        return next( new ApiError(500, "An error occurred while adding book !"))
    }
}

module.exports.update = async (req, res, next) =>{
    try {
        await verifyToken(req,res)
        const bookservice = new bookService()
        const result =  await bookservice.update(req.body)
        res.json(result)
    } catch (error) {
        if(error == 'Unauthorized !') {
            return next( new ApiError(401,error))
        }
        return next( new ApiError(500, "An error occurred while updating book !"))
    }
}

module.exports.delete = async (req, res, next) =>{
    try {
        await verifyToken(req,res)
        const bookservice = new bookService()
        const result =await  bookservice.delete(req.params.MaSach)
        if(!result) {
            return next ( new ApiError (404, "Book not found !"))
        }
        return res.json({
            result,
            message:"Book was deleted successfully !"
        })
    } catch (error) {
        if(error == 'Unauthorized !') {
            return next( new ApiError(401,error))
        }
        return next( new ApiError(500, "An error occurred while updating book !"))
    }
}

module.exports.deleteAll = async (req, res,  next) =>{
    try {
        await verifyToken(req,res)
        const bookservice = new bookService()
        const deletedCount = await bookservice.deleteAll()
        res.json({
            message: `${deletedCount} books were deleted successfully !`
        })
    } catch (error) {
        if(error == 'Unauthorized !') {
            return next( new ApiError(401,error))
        }
        return next( new ApiError(500, "An error occurred deleting all books !"))
    }
}