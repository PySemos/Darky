require("dotenv").config();
const express = require("express");
const session = require("express-session");
const compression = require("compression");
const path = require("path");
const configs = require("./configs");
const DB = require("./database/connection");
// Rutas
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");
const chatsRoutes = require("./routes/chats")
const morgan = require("morgan")
//Sockets
const {ServerSocket} = require("./connections")

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.session = session(configs.option_session)
    this.#middlewares();
    this.paths = {
      index: "/",
      users: "/api/users",
      auth: "/api/auth",
      chats: "/api/chats"
    };

    // Initializing the database
    this.#connectDB();

    this.sockets = new ServerSocket(this)

    // Calling routes
    this.#routes();

  }
  
  #middlewares() {
    this.app.use(this.session);
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "../frontend/static")));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan("tiny"))
  }

  #connectDB() {
    DB.init();
  }

  #routes() {
    this.app.use(this.paths.index, indexRoutes);
    this.app.use(this.paths.users, userRoutes);
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.chats, chatsRoutes)
  }

  /* start() {
    // Initializing the server
    this.app.listen(this.port, () =>
      console.log(`Server en el puerto ${this.port}`)
    );
  } */
}

/* new App().start(); */

let app = new App()
