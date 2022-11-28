const http = require("http")
const {Server} =require("socket.io")
const {Message,Chat} = require("./models/chat")
const user = require("./models/user")
const User = require("./models/user")
const {getChatByUsers} = require("./utils/utilsChat")

class ServerSocket{

    constructor(app){
        this.app = app.app
        this.server = http.Server(this.app)
        this.io = new Server(this.server)
        const wrap = (sessionMiddleware)=>(socket,next)=>sessionMiddleware(socket.request,{},next)
        this.io.use(wrap(app.session))
        this.#sockets()
        this.#listenServer()
    }
    #listenServer(){
        this.server.listen(3000,()=>{
            console.log("Socket server listening in port 3000")
        })
    }
    #sockets(){
        this.io.on("connection",(socket)=>{
            console.log("Coneccion")
            socket.on("send",async(body,to)=>{
                const fromUser = await User.findOne({
                    username:socket.request.session.username
                })
                let toUsers = []
                if(Array.isArray(to)){
                    console.log("if")
                    for(let i of to){
                        var temp = await User.findOne({
                            username:i
                        })
                        if (temp){
                            toUsers.push(temp)
                        }
                    }
                }
                else{
                    console.log("else")
                    toUsers.push(
                        await User.findOne({
                            username:to
                        })
                    )
                }
                console.log(toUsers)
                if(fromUser && toUsers){
                    const message = new Message({
                        body:body,
                        from:fromUser._id,
                        to:toUsers
                    })
                    message.save()
                    let chat = await getChatByUsers([fromUser._id,...toUsers])
                    if(chat === undefined){
                        chat = new Chat({
                            participants:[fromUser,...toUsers],
                            messages:[message],
                            lastMessage:message
                        })
                        chat.save()
                    }
                    else{
                        chat.messages.push(message)
                        chat.save()
                    }   
            }})
        })
    }
    
}

module.exports = {
    ServerSocket
}