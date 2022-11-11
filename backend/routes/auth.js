const { Router } = require("express");
const { check } = require("express-validator");
const validate = require("../middlewares/validate")
const {
  viewSignIn,
  viewSignUp,
  signIn,
  logOut,
  viewlogOut,
} = require("../controller/auth");

class AuthRoutes {
  constructor() {
    this.router = Router();
    this.#routes();
  }

  #routes() {
    //this.router.get("/", viewSignIn);
    //this.router.get("/signUp/", viewSignUp);
    this.router.get("/logOut", logOut);
    this.router.post("/",validate.validate, signIn);
  }
}

module.exports = new AuthRoutes().router;
