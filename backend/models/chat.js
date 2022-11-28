const {model,Schema} = require("mongoose")
const same = require("../utils/same")

const Message = new Schema({
    body:{type:String,required:true},
    from:{type:Schema.Types.ObjectId,ref:"users",required:true},
    to:[{type:Schema.Types.ObjectId,ref:"users",required:true}],
    date:{type:Date,default:Date.now}
})

const Chat = new Schema({
    participants : [
        {
            type:Schema.Types.ObjectId,
            ref:"users"
        }
    ],
    messages:[{
        type:Schema.Types.ObjectId,
        ref:"messages",
    }],
    lastMessage:{
        type:Schema.Types.ObjectId,
        ref:"messages",
    }
})

module.exports = {
    Message : model("message",Message),
    Chat : model("chat",Chat)
}