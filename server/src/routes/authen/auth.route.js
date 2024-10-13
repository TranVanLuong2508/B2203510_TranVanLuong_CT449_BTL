const express =  require("express")
const router = express.Router()
const authenticationController = require("../../controllers/auth.controller")

router.post("/login", authenticationController.login)
      .post("/signup", authenticationController.signup)
      .post("/staffSignup", authenticationController.staffSignup)
      .post("/staffLogin", authenticationController.staffLogin)
module.exports = router
