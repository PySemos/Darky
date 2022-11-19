const {model,Schema} = require("mongoose")

const Chat = new Schema({
    body:{type:String,required:true},
    from:{type:Schema.Types.ObjectId,ref:"users",required:true},
    to:{type:Schema.Types.ObjectId,ref:"users",required:true}
})

module.exports = model("chats",Chat)