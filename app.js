const express = require("express")
const path = require("path")
const {user} = require("./db")
const session = require("express-session")
app = express()
app.use(express.static("./frontend/public"))
app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:"secret",
    cookie:{
        maxAge:10000
    },
    saveUninitialized:true,
    resave:false
}))

let session_var

function session_watcher(req,res,next){
    if (!req.session.username){
        return res.status(403).send("No acceso")
    }
    else{
        next();
    }
}

app.get("/",session_watcher,(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,"./frontend/index.html"))
})

app.get("/create_user/",(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,"./frontend/sign_up.html"))
})

app.post("/create_user",(req,res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    session_var= req.session
    session_var.username = username
    session_var.password = password
    console.log(session)
    user.create({
        username:username,
        email:email,
        password:password
    })
    res.send("Done")
})

app.get("/log_in/",(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,"./frontend/log_in.html"))
})

app.post("/log_in/",(req,res)=>{
    session_var = req.session
    //Condiciones
    if(true){
        session_var.username = req.body.username
        session_var.password = req.body.username
    }

})
app.get("/log_out/",(req,res)=>{
    session_var = null
    return res.send("Done")
})

app.listen(3000,()=>{
    console.log("Server running in port 3000")
})