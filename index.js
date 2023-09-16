const Express = require("express")
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const bodyParser = require("body-parser")
const toughtsRouter = require("./routes/toughtsRoutes.js")
const User = require("./models/User.js")
const Tought = require("./models/Tought.js")
const ToughtsController = require("./controllers/ToughtsController.js")
const  sequelize = require("./db/connection.js");
const authRouter = require("./routes/authRoutes.js")

const app = Express()


app.set("view engine", "ejs")
app.use(Express.static("public"))

app.use(Express.urlencoded({extended:true}))
app.use(Express.json())

app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
)

// flash messages
app.use(flash());


// set session to res
app.use((req, res, next) => {
  // console.log(req.session)
  console.log(req.session.userid);

  if (req.session.userid) {
    res.locals.session = req.session;
  }
  
  
  next();
});



app.use("/toughts", toughtsRouter)
app.get("/",toughtsRouter)
app.use("/", authRouter)

sequelize.sync().then((result) => {
    
}).catch((err) => {
    console.log(err)
});
app.listen(3000,(req,res)=>{
    console.log("conectado com sucesso na porta :", 3000)
})