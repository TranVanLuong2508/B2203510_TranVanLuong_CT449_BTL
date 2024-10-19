const express = require("express")
const router =  express.Router()

const bookController = require('../../controllers/book.controller')

router
    .get('/', bookController.getAll)
    .put('/add', bookController.add)
    .patch('/update/:MaSach', bookController.update)
    .delete('/delete/:MaSach', bookController.delete)
    .delete('/delete', bookController.deleteAll)

module.exports = router