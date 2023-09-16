// const session = require("express-session")
const User = require("../models/User.js")
const bcrypt = require("bcryptjs")

module.exports = class AuthController{
    

    static LoginLoad(req,res){
        res.render("auth/login",)
    }
    static async Login(req,res){
        const  {email,password} =  req.body

        const salt = bcrypt.genSaltSync(10)
        const hashedpassword = bcrypt.hashSync(password,salt)
        const currentUser = await User.findOne({where :{email:email}})

        if (!currentUser){
            req.flash("message", "Essa conta não existe crie um para acessar o site")
            return res.render("auth/login")
            
        }
        const match = bcrypt.compareSync(password, currentUser.password)
        if (match){
            try {
                req.session.userid  = currentUser.id
                req.flash("message", "Só boa logado fiiwk")
                req.session.save(()=>{
                    
                    return res.redirect("/")
                })
                
            }
            catch(err) {
                console.log(err)
            }
        }
        else {
            req.flash("message", "A senha esta errada")
            res.render("auth/login")
        }
        
    }
    static Register(req,res){
        res.render("auth/register")
    }

    static async registerPost(req,res){
        const  {name,email,password,confirmpassword} = await req.body
        if (password != confirmpassword){
            req.flash("message", "As senhas não conferem, tente novamente!")
            res.render("auth/register")
            return
        }
        const checkifuserexists = await User.findOne({where :{email:email}})

        if (checkifuserexists){
            req.flash("message", "O email ja esta em uso!")
            res.render("auth/register")
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedpassword = bcrypt.hashSync(password,salt)
        const user = {
            name,
            email,
            password : hashedpassword,
        }
        try {
            const createdUser =  await User.create(user);
            req.session.userid  = createdUser.id

            req.flash("message", "Cadastro Realizaod com sucesso!")
            
            req.session.save(()=>{
                return res.redirect("/")
            })
            
        }
        catch(err) {
            console.log(err)
        }
    }
    static logout(req,res) {
        req.session.destroy()
        res.redirect("/login")
    }
}