const express =  require("express")
const router = express.Router()
const authenticationController = require("../../controllers/auth.controller")

router.post("/signIn", authenticationController.signIn)
      .post("/signUp", authenticationController.signUp)
      .post("/staffSignUp", authenticationController.staffSignUp)
      .post("/staffSignIn", authenticationController.staffSignIn)
module.exports = router
