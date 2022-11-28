const { Router } = require("express");
const chats = require("../controller/chats")
class ChatsRoutes {
  constructor() {
    this.router = Router();
    this.#routes();
  }

  #routes() {
    this.router.get("/my_chats/",chats.my_chats)
  }   
}

module.exports = new ChatsRoutes().router;
