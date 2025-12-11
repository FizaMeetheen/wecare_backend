const express = require("express")
const { registerController, loginController, googleLoginController, editProfileCOntroller } = require("./controller/userController")
const jwtMiddleware = require("./middleware/jwtMiddleware")
const { emergencyRequestController } = require("./controller/requestController")
const upload = require("./middleware/imageMulterMiddleware")

const router = express.Router()

//register
router.post("/register",registerController)

//login
router.post("/login",loginController)

//google-login
router.post("/google-login",googleLoginController)

//emergency-request
router.post("/emergency",emergencyRequestController)

//edit-profile
router.put("/edit-profile",jwtMiddleware,upload.single("profile"),editProfileCOntroller)

module.exports = router