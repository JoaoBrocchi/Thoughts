
const checkAuth = require("../helpers/auth.js").checkAuth
const router = require("express").Router()
const ToughtsController = require("../controllers/ToughtsController.js");

router.route("/")
    .get(ToughtsController.showToughts)
    

router.route("/dashboard")
    .get(checkAuth,ToughtsController.dashboard)

router.route("/add")
    .get(checkAuth,ToughtsController.createThought)
    .post(checkAuth,ToughtsController.createThoughtPost)
router.route("/remove")
    .post(ToughtsController.thoughtsRemove)
router.route("/edit/:id")
    .get(ToughtsController.editThought)
    .post(ToughtsController.editThoughtPost)
module.exports = router;