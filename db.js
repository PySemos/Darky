const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/chat")
    .catch(()=>{
    console.log("DB failed");process.exit()
})

console.log("DB checked")            
const user = mongoose.Schema({
    username:String,
    email:String,
    password:String,
})

const user_model = mongoose.model("User",user)

module.exports = {
    user:user_model
}