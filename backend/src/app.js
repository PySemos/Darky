const express = require("express");
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const path = require("path");
const DB = require("./connections/connection");

// Rutas
const userRoutes = require("./routes/user.routes");

class Index {
  constructor() {
    this.app = express();
    this.#middlewares();
    this.#configs();
    this.#routes();
  }

  #middlewares() {
    this.app.use(
      session({
        secret: "secret",
        cookie: {
          maxAge: 100000,
        },
        saveUninitialized: true,
        resave: false,
      })
    );
  }

  #configs() {
    this.app.use(express.static(path.join(__dirname, "../frontend/public")));
    this.app.use(express.urlencoded({ extended: false }));
  }

  #routes() {
    this.app.use("/api", userRoutes);
  }

  start() {
    this.app.listen(PORT, () => {
      `Server en el puero ${PORT}`;

      // Iniciando mi base de datos
      DB.init();
    });
  }
}

new Index().start();
