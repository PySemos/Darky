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
        this.router.get("/signUp/", contr.viewSignUp);
        this.router.get("/signIn/", contr.viewSignIn);
    }
}

module.exports = new AppRoutes().router