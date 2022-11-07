const { Router } = require("express");
const { check } = require("express-validator");
const {
  viewSignIn,
  viewSignUp,
  signIn,
  logOut,
} = require("../controller/auth");

class AuthRoutes {
  constructor() {
    this.router = Router();
    this.#routes();
  }

  #routes() {
    this.router.get("/", viewSignIn);
    this.router.get("/signUp/", viewSignUp);
    this.router.get("/logOut", logOut);
    this.router.post("/", signIn);
  }
}

module.exports = new AuthRoutes().router;
