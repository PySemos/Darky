const { Router } = require("express");
const ctrlUser = require("../controller/user.controller");

class UserRoutes {
  constructor() {
    this.router = Router();
    this.#routes();
  }

  #session_watcher(req, res, next) {
    console.log("/")
    if (!req.session.username) res.redirect("/signIn");
    else next();
  }

  #routes() {
    this.router.get("/", this.#session_watcher, ctrlUser.index);
    this.router.get("/signUp/", ctrlUser.viewSignUp);
    this.router.get("/signIn/", ctrlUser.viewSignIn);
    this.router.post("/signIn", ctrlUser.signIn);
    this.router.get("/log_out", ctrlUser.logOut);
    this.router.get("/users/", ctrlUser.getUsers);
    this.router.get("/users/:id", ctrlUser.getUser);
    this.router.post("/create_user/", ctrlUser.addUser);
  }
}

module.exports = new UserRoutes().router;
