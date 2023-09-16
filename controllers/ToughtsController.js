const User = require("../models/User.js")
const Tought = require("../models/Tought.js")

const {Op} = require("sequelize")

module.exports = class ToughtsController {

    static async showToughts(req,res){
        let search = ''
        if(req.query.search){
            search = req.query.search
        }
        
        let ordem = "DESC"
        if(req.query.order === "old"){
            ordem = "ASC"
        }
        else {
            ordem = "DESC"
        }
        
        const thoughtsData = await Tought.findAll({
            include : User,
            where:{
                title: {[Op.like]: `%${search}%` }
            },
            order:[["CreatedAt", ordem]]
            
        })
        
        const thoughts = thoughtsData.map((result)=> result.get({plain: true}))
        const thoughtsQty = thoughts.length
        if (thoughtsQty === 0){
            thoughtsQty = false
        }
        
        console.log(thoughtsQty)
        res.render("toughts/home",{thoughts:thoughts,search: search, quantidade: thoughtsQty})
    }
    static async dashboard(req,res){
        const userId = req.session.userid
        
        const user = await User.findOne({
            where : {id : userId},
            include : Tought,
            plain : true
        })
        if(!user) {
            res.redirect("/login")
        }

        const thoughts = user.Toughts.map((result)=> result.dataValues)
        res.render("toughts/dashboard",{thoughts : thoughts})
        
    }
    static async createThought(req,res){
        res.render("toughts/add")
    }
    static async createThoughtPost(req,res){
        await Tought.create({
            title : req.body.title,
            UserId: req.session.userid
        }).then((result) => {
            req.flash("message","pensamento criado com sucesso!")
            req.session.save(()=>{
                res.redirect("/thoughts/dashboard")
                return 
            })
            
        }).catch((err) => {
            console.log("aconteceu um erro : ",err)
        });

        
    }
    static async thoughtsRemove(req,res){
        await Tought.destroy({where: {id: req.body.id}})
        res.redirect("/thoughts/dashboard")
    }
    static async editThought(req,res){
        const thought =  await Tought.findOne({where:{id:req.params.id}})
        res.render("toughts/edit", {thought : thought})
    }
    static async editThoughtPost(req,res){
       const pensamento =  await Tought.findOne({where:{id:req.params.id}})
       await pensamento.update({title : req.body.title})
        await pensamento.save()
        req.flash("message","pensamento criado com sucesso!")
        req.session.save(()=>{
            res.redirect("/thoughts/dashboard")
            return 
        })
    


    }

}