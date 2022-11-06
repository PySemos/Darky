const {Router} = require("express")
//controles
const contr = require("../controller/app.controller")
const ctrlUser = require("../controller/user.controller")
const util = require("../utils/utils")
class AppRoutes{
    constructor(){
        this.router = Router()
        this.#routes()
    }
    #routes(){
        this.router.get("/", util.session_watcher, contr.index);
        this.router.post("/signIn", contr.signIn);
        this.router.get("/signUp/", contr.viewSignUp);
        this.router.get("/signIn/", contr.viewSignIn);
        this.router.post("/create_user/", ctrlUser.addUser);
    }
}

module.exports = new AppRoutes().router