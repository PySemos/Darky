const { Router } = require("express");
//const { check } = require("express-validator");
const ctrlUsers = require("../controller/user");
const { emailExists } = require("../database/db-validators");
const { fieldValidator } = require("../middlewares/fields-validator");
const validate = require("../middlewares/validate")
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
      "/createUser",
      [
        validate.validate,
        validate.validateUser
      ],
      ctrlUsers.usersPost
    );

    // PUTS
    // Method to update a user
    this.router.put(
      "/:id",
      [
        validate.validate,
        validate.validateUser
      ],
      ctrlUsers.usersUpdate
    );

    // DELETE
    // Method to delete a user
    this.router.delete(
      "/:id",
      [
        //check("id", "El id ingresado es incorrecto").isMongoId(),
        //fieldValidator,
      ],
      ctrlUsers.usersDelete
    );
  }
}

module.exports = new UserRoutes().router;
