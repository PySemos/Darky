const { Router } = require("express");
const { check } = require("express-validator");
const ctrlUsers = require("../controller/user");
const { emailExists } = require("../database/db-validators");
const { fieldValidator } = require("../middlewares/fields-validator");

class UserRoutes {
  constructor() {
    this.router = Router();
    this.#routes();
  }

  #routes() {
    // GETS
    this.router.get("/", ctrlUsers.usersGet);

    // POSTS
    // Method to create a new user
    this.router.post(
      "/",
      [
        check("email", "El email no es correcto").isEmail(),
        check("email").custom(emailExists),
        fieldValidator,
      ],
      ctrlUsers.usersPost
    );

    // PUTS
    // Method to update a user
    this.router.put(
      "/:id",
      [
        check("id", "El id ingresado es incorrecto").isMongoId(),
        fieldValidator,
      ],
      ctrlUsers.usersUpdate
    );

    // DELETE
    // Method to delete a user
    this.router.delete(
      "/:id",
      [
        check("id", "El id ingresado es incorrecto").isMongoId(),
        fieldValidator,
      ],
      ctrlUsers.usersDelete
    );
  }
}

module.exports = new UserRoutes().router;
