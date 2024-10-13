const express = require("express")
const router =  express.Router()

const bookBorrwoController = require("../../controllers/bookBorrow.controller")
router.get('/', bookBorrwoController.index)
module.exports = router