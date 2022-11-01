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
        maxAge:100000
    },
    saveUninitialized:true,
    resave:false
}))

async function user_is_unique(username){
    const query = await user.find()
    for(let i=0;i<query.length;i++){
        if (username == query[i].username){
            return false
        }
    }
    return true
}

async function findUser(username){
    users = await user.find()
    for(let i = 0;i<=users.length;i++){
        if (users[i].username==username){
            return users[i]
        }
    }
    return {}
}

function session_watcher(req,res,next){
    console.log(req.session)
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

app.post("/create_user",async (req,res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    if(await user_is_unique(username)){
        req.session.username = username
        console.log(session)
        user.create({
            username:username,
            email:email,
            password:password
        })
        res.send("Done")
    }
    else{
        return res.status(200).send("Usernme has been taken")
    }
})

app.get("/log_in/",(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname,"./frontend/log_in.html"))
})

app.post("/log_in/",async (req,res)=>{
    //Condiciones
    let u = await findUser(req.body.username)
    if(u){
        if(u.password === req.password){
            req.session.username = req.body.username
            return res.send("Done")
        }
        else{
            return res.status(403).send("Password doesn't match")
        }
    }
    else{
        return res.status(404).send("User didnt finded")
    }
})
app.get("/log_out/",(req,res)=>{
    session_var = null
    return res.send("Done")
})

app.listen(3000,()=>{
    console.log("Server running in port 3000")
})