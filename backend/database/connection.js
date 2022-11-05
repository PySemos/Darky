const mongoose = require("mongoose");
const configs = require("../configs");

class MongoDB {
  async init() {
    try {
      await mongoose.connect(configs.db_dev);

      console.log("Conectado correctamente a la base de datos");
    } catch (err) {
      console.log("Ocurrio un error al conectarse con la base de datos");
    }
  }
}

module.exports = new MongoDB();
