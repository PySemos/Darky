const mongoose = require("mongoose");

class MongoDB {
  async init() {
    try {
      await mongoose.connect("mongodb://localhost:27017/chat");
      console.log("Conectado correctamente a la base de datos");
    } catch (err) {
      console.log("Ocurrio un error al conectarse con la base de datos");
      process.exit();
    }
  }
}

module.exports = new MongoDB();
