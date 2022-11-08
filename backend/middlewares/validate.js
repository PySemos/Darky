const {userIsUnique,emailIsUnique} = require("../controller/user")

const validateUser = async(req,res,next)=>{
    if(req.body.username ==''){
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
    // Username is unique
    if(!await userIsUnique(req.body.username)){
        return res.json({
            sucess:false,
            error:"Username taken"
        })
    }
    if(req.body.email!=""){
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
    validateUser:validateUser
}