const { Router } = require("express");
const { index } = require("../controller/index");
const { session_watcher } = require("../middlewares/sessions");

class Index {
  constructor() {
    this.router = Router();
    this.#routes();
  }

  #routes() {
    this.router.get("/", session_watcher, index);
  }
}

module.exports = new Index().router;
