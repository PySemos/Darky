const { Router } = require("express");
const ctrlUser = require("../controller/user.controller");
const util = require("../utils/utils")

class UserRoutes {
  constructor() {
    this.router = Router();
    this.#routes();
  }

  #routes() {
    this.router.post("/signIn", ctrlUser.signIn);
    this.router.get("/log_out", ctrlUser.logOut);
    this.router.get("/users/", ctrlUser.getUsers);
    this.router.get("/users/:id", ctrlUser.getUser);
    this.router.post("/create_user/", ctrlUser.addUser);
  }
}

module.exports = new UserRoutes().router;
