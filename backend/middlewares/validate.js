const {userIsUnique,emailIsUnique} = require("../controller/user")


/* Middleware that validate if the username or password is empty */
const validate = function(req,res,next){
    if(req.body.username == ''){
        return res.json({
            sucess:false,
            error:"Username can't be empty"
        })
    }
    if(req.body.password ==''){
        return res.json({
            sucess:false,
            error:"Password can't be empty"
        })
    }
    next()
}


// Middleware that watch if the user provided is unique
const validateUser = async(req,res,next)=>{
    // Username is unique
    if(!await userIsUnique(req.body.username)){
        return res.json({
            sucess:false,
            error:"Username taken"
        })
    }
    if(req.body.email!="" && req.body.email !=undefined){
        //Email is Unique
        if(!await emailIsUnique(req.body.email)){
            return res.json({
                sucess:false,
                error:"Email Taken"
            })
        }
    }
    next()
}

module.exports = {
    validate:validate,
    validateUser:validateUser
}