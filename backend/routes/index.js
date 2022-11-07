const { Router } = require("express");
const { index } = require("../controller/index");
const { session_watcher } = require("../middlewares/sessions");
const {
  viewSignIn,
  viewSignUp,
  signIn,
  logOut,
} = require("../controller/auth");


class Index {
  constructor() {
    this.router = Router();
    this.#routes();
  }

  #routes() {
    this.router.get("/", session_watcher, index);
    this.router.get("/signIn/", viewSignIn);
    this.router.get("/signUp/", viewSignUp);
    this.router.get("/logOut/", logOut);
  }
}

module.exports = new Index().router;
