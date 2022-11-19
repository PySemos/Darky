const http = require("http")
const {Server} =require("socket.io")
const Chat = require("./models/chat")
const User = require("./models/user")

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
                const toUser = await User.findOne({
                    username:to
                })
                console.log(body)
                console.log(to)
                console.log(toUser)
                if(fromUser && toUser){
                    const chat = new Chat({
                        body:body,
                        from:fromUser._id,
                        to:toUser._id
                    })
                    chat.save()
                }
            })
        })
    }
    
}

module.exports = {
    ServerSocket
}