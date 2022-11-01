const compression = require("compression");
const express = require("express");
const PORT = process.env.PORT || 3000;

class Index {
  constructor() {
    this.app = express();
    this.#middlewares();
    this.#configs();
    this.#routes();
  }

  #middlewares() {}

  #routes() {}

  #configs() {
    this.app.use(express.static("./frontend"));
    this.app.use(express.json());
    this.app.use(compression());
  }

  start() {
    this.app.listen(PORT, () => {
      console.log(`Server en el puerto ${PORT}`);
    });
  }
}

new Index().start();
