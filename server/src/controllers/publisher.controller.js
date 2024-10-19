const publisherService = require('../services/publisher.service')
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

// [POST] [publisher/add]
module.exports.add =  async (req, res, next ) =>{
    if(!req.body?.TenNXB) {
        return next ( new ApiError(400, "Publisher name can not be not empty !"))
    }
    try {
        await verifyToken(req, res)
        const publisher = new publisherService()
        const result =  await publisher.add(req.body)
        res.json(result)

    } catch (error) {
        if (error == 'Unauthorized !'){
            return next( new ApiError(401, error))
        }
        return next( new ApiError(500, "An error occurred while Add Publisher !"))
    }
}


//[PATCH] /publisher/update/:MaNXB
module.exports.update = async (req, res , next) =>{
    try {
        await verifyToken(req, res) 
        const publisher = new publisherService()
        const result = await publisher.update( req.params.MaNXB ,  req.body)
        if(!result) {
            return next ( new ApiError(404, "Publisher not found") )
        }
        return res.json({
            result,
            message: "Publisher was updated successfully !"
        })
    } catch (error) {
        if(error == 'Unauthorized !') {
            return next ( new ApiError(401, error))
        } else {
            return next( new ApiError(500, "An error occurred while update !"))
        }
    }
}


//[DELETE] /publisher/delete/:MaNXB
module.exports.delete =  async (req, res, next ) =>{
    try {
        await verifyToken(req, res) 
        const publisher = new publisherService()
        const result = await publisher.delete(req.params.MaNXB)
        if(!result) {
            return next(new ApiError (404, "Publisher not found"))
        }
        return res.json({
            result,
            message: "Publisher was deleted successfully !"
        })
    } catch (error) {
        if(error == 'Unauthorized !') {
            return next ( new ApiError(401, error))
        } else {
            return next( new ApiError(500, "An error occurred while delete !"))
        }
    }
}

//[GET] /publisher/
module.exports.getAll = async ( req, res, next) =>{
    try {
        await verifyToken(req, res)
        const publisher = new publisherService()
        const {TenNXB} = req.query
        if(!TenNXB) {
            const result = await publisher.find({})
            res.json(result)
        } else {
            const result = await publisher.findByName(TenNXB)
            res.json(result)
        }
    } catch (error) {
        if(error == 'Unauthorized !') {
            return next ( new ApiError(401, error))
        } else {
            return next( new ApiError(500, "An error occurred while getAll !"))
        }
    }
}

//[DELETE] publisher/deleteAll
module.exports.deleteAll = async ( req, res, next) =>{
    try {
        await verifyToken(req, res)
        const publisher = new publisherService()
        const deleteCount = await publisher.deleteAll()
        res.json({
            message: `${deleteCount} Publisher were deleted successfully !!`
        })
    } catch (error) {
        if(error == 'Unauthorized !') {
            return next ( new ApiError(401, error))
        } else {
            return next( new ApiError(500, "An error occurred while deleteAll !"))
        }
    }
}

