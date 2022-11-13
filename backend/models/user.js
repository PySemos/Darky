const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt")
// Models
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

UserSchema.methods.createHash = async function (plainTextPassword) {

  // Hashing user's salt and password with 10 iterations,
  const saltRounds = 10;

  // First method to generate a salt and then create hash
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);

  // Second mehtod - Or we can create salt and hash in a single method also
  // return await bcrypt.hash(plainTextPassword, saltRounds);
};

// Validating the candidate password with stored hash and hash function
UserSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = model("users", UserSchema);
