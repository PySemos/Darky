const { Router } = require("express");
const { check } = require("express-validator");
const {
  usersGet,
  signIn,
  usersUpdate,
  usersDelete,
  usersPost,
  viewSignUp,
  viewSignIn,
  index,
  logOut,
} = require("../controller/user");
const { emailExists } = require("../database/db-validators");
const { fielValidator } = require("../middlewares/fields-validator");

class UserRoutes {
  constructor() {
    this.router = Router();
    this.#routes();
  }

  #session_watcher(req, res, next) {
    if (!req.session.username) res.send("No puedes acceder a esta pagina");
    else next();
  }

  #routes() {
    // GETS
    this.router.get("/", usersGet);
    this.router.get("/index/", this.#session_watcher, index);
    this.router.get("/signUp/", viewSignUp);
    this.router.get("/signIn/", viewSignIn);
    this.router.get("/logOut", logOut);

    // POSTS
    this.router.post(
      "/",
      [
        check("email", "El email no es correcto").isEmail(),
        check("email").custom(emailExists),
        fielValidator,
      ],
      usersPost
    );
    this.router.post("/signIn", signIn);

    // PUTS
    this.router.put(
      "/:id",
      [check("id", "El id ingresado es incorrecto").isMongoId(), fielValidator],
      usersUpdate
    );

    // DELETE
    this.router.delete(
      "/:id",
      [check("id", "El id ingresado es incorrecto").isMongoId(), fielValidator],
      usersDelete
    );
  }
}

module.exports = new UserRoutes().router;
