const User = require("../models/user.model");
const path = require("path");
const pathFrontend = path.join(path.resolve(), "/frontend");

function index(req, res) {
  if (req.session.username) {
    res.send(
      `Welcome ${req.session.username} <a href='http://localhost:3000/api/log_out'>click to logout</a>`
    );
  } else res.sendFile(`${pathFrontend}/api/`);
}

async function getUser(req, res) {}

async function getUsers(req, res) {
  try {
    let users = await User.find();

    res.json({ message: "Usuarios", body: users });
  } catch (err) {
    res.send("Ocurrio un error al obtener los usuarios");
  }
}

async function addUser(req, res) {
  try {
    let { username } = req.body;
    let user = await User.findOne({ username });

    if (!user) {
      let newUser = new User({ ...req.body });
      await newUser.save();
      req.session.username = username;
      res.send("Usuario Agregado Correctamente");
    } else res.send("Usuario Existente");
  } catch (err) {
    res.send("Ocurrio un error al obtener al crear un nuevo usuario");
  }
}

async function signIn(req, res) {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });

    if (user) {
      if (user.password === password) {
        req.session.username = username;
        res.send("Done");
      } else res.send("Verifique los datos");
    } else res.send("Usuario no encontrado");
  } catch (err) {
    res.send("Ocurrio un problema al loguarse");
  }
}

function viewSignUp(req, res) {
  res.sendFile(`${pathFrontend}/sign_up.html`);
}

function viewSignIn(req, res) {
  res.sendFile(`${pathFrontend}/log_in.html`);
}

function logOut(req, res) {
  req.session.destroy();
  res.redirect("/api/");
}

module.exports = {
  index,
  viewSignUp,
  viewSignIn,
  logOut,
  getUser,
  getUsers,
  addUser,
  signIn,
};
