const path = require("path");
const User = require("../models/user.model");
const pathFrontend = path.join(__dirname, "../../../frontend");

function index(req, res) {
    console.log(req.session)
    if (req.session.username) {
      return res.send(
        `Welcome ${req.session.username} <a href='http://localhost:3000/log_out'>click to logout</a>`
      );
    } else res.sendFile(`${pathFrontend}/api/`);
  }
function viewSignUp(req, res) {
  res.sendFile(`${pathFrontend}/sign_up.html`);
}

function viewSignIn(req, res) {
  res.sendFile(`${pathFrontend}/log_in.html`);
}

async function addUser(req, res) {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      let newUser = new User({ username, email, password });

      await newUser.save();
      req.session.username = username;
      res.send("Done");
    } else {
      res.send("Usuario Existente");
    }
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
        res.redirect("/");
      } else res.send("Verifique los datos");
    } else res.send("Usuario no encontrado");
  } catch (err) {
    console.log(err)
    res.send("Ocurrio un problema al loguearse");
  }
}

function logOut(req, res) {
  req.session.destroy();
  res.redirect("/api/");
}

module.exports = {
    index,
    viewSignIn,
    viewSignUp,
    addUser,
    signIn,
    logOut
}