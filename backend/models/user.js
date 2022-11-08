const { model, Schema } = require("mongoose");

const UserSchema = Schema(
  {
    username: { type: String, required: true },
    email: String,
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { versionKey: false }
);

UserSchema.methods.toJSON = function () {
  let { password, ...data } = this.toObject();
  return data;
};

module.exports = model("users", UserSchema);
