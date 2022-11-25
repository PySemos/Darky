const {Chat} = require('../models/chat')
const same = require("./same")
const getChatByUsers = async(users)=>{
    for (const chat of await Chat.find({})) {
        if(same(chat.participants,users)){
            return chat
        }
    }
}

module.exports = {
    "getChatByUsers":getChatByUsers
}