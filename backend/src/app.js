const express = require("express");
const session = require("express-session");
const compression = require("compression");

const path = require("path");

const configs = require("./configs");
const PORT = process.env.PORT || 3000;
const DB = require("./connections/connection");
const morgan =require("morgan")
// Rutas
const userRoutes = require("./routes/user.routes");

class Index {
  constructor() {
    this.app = express();
    this.#middlewares();

    // Establecera las configuraciones iniciales del programa
    this.#configs();

    // Incializamos la funcion con todas las rutas de nuestro programa
    this.#routes();
  }

  #middlewares() {
    this.app.use(session(configs.option_session));
  }

  #configs() {
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "../frontend/public")));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan('tiny'));
  }

  #routes() {
    // Ruta Inicial 'Index'
    this.app.use("/api", userRoutes);
  }

  start() {
    // Incializamos el servidor
    this.app.listen(PORT, () => {
      `Server en el puero ${PORT}`;

      // Iniciando la base de datos
      DB.init();
    });
  }
}

new Index().start();
