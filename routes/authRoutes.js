const router = require("express").Router()
const AuthController = require("../controllers/AuthController.js")

router.route("/login")
    .get(AuthController.LoginLoad)
    .post(AuthController.Login)

router.route("/register")
    .get(AuthController.Register)
    .post(AuthController.registerPost)

router.route("/logout")
    .get(AuthController.logout)
module.exports = router;