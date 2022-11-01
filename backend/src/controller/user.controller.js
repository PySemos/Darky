const User = require("../models/user.model");
const path = require("path");

function index(req, res) {
  res.status(200).sendFile(path.resolve(__dirname, "./frontend/index.html"));
}

async function getUser(req, res) {}

async function getUsers(req, res) {}

async function addUser(req, res) {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      let newUser = new User({ username, email, password });

      await newUser.save();

      res.send("Done");
    } else {
      res.json({ message: "Usuario Existente" });
    }
  } catch (err) {
    res.send("Ocurrio un erro al obtener al crear un nuevo usuario");
  }
}

async function signIn(req, res) {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      if (user.password === password) {
        req.session.username = req.body.username;
        res.send("Done");
      } else res.send("Contrasenia incorrecta");
    } else res.send("Usuario no encontrado");
  } catch (err) {
    res.send("Ocurrio un problema al loguarse");
  }
}

function viewSignUp(req, res) {
  res.sendFile(path.join(process.cwd(), "./frontend/sign_up.html"));
}

function viewSignIn(req, res) {
  res.sendFile(path.join(process.cwd(), "./frontend/log_in.html"));
}

function logOut(req, res) {
  req.session == null;
  res.send("Done");
}

module.exports = {
  index,
  viewSignUp,
  viewSignIn,
  logOut,
  getUser,
  getUsers,
  addUser,
};
