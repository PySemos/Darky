const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  { versionKey: false }
);

module.exports = model("users", userSchema);
