const Tought = require("../models/Tought")

const router = require("express").Router()
const ToughtsController = require("../controllers/ToughtsController.js");
const session = require("express-session");
router.route("/")
    .get(ToughtsController.showToughts)


module.exports = router;