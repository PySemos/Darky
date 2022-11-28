const {Chat} = require("../models/chat")
const Users = require("../models/user")
const my_chats = async(req,res)=>{
    try{
        const user = await Users.findOne({username:req.session.username})
        const {participant} = req.query
        if(participant){
            
        }
        console.log(user)
        const my_chats = await Chat.find({"participants":user._id})
       
        return res.status(200).json({
            sucess:true,
            chats:my_chats
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            sucess:false
        })
    }
}

module.exports = {
    "my_chats":my_chats,
}