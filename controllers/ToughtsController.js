const User = require("../models/User.js")
const Tought = require("../models/Tought.js")

module.exports = class ToughtsController {

    static async showToughts(req,res){
        
        res.render("toughts/home",{session : false})
    }
}