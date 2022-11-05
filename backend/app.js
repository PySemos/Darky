require("dotenv").config();
const express = require("express");
const session = require("express-session");
const compression = require("compression");

const path = require("path");

const configs = require("./configs");
const DB = require("./database/connection");

// Rutas
const userRoutes = require("./routes/user");

class Index {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.#middlewares();

    // Inicializando la base de datos
    this.#connectDB();

    // Incializamos la funcion con todas las rutas de nuestro programa
    this.#routes();
  }

  #middlewares() {
    this.app.use(session(configs.option_session));
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "../frontend/public")));
    this.app.use(express.urlencoded({ extended: false }));
  }

  #connectDB() {
    DB.init();
  }

  #routes() {
    // Ruta Inicial 'Index'
    this.app.use("/api/users", userRoutes);
  }

  start() {
    // Incializamos el servidor
    this.app.listen(this.port, () => {
      console.log(`Server en el puerto ${this.port}`);
    });
  }
}

new Index().start();
