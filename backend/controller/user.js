const User = require("../models/user");
const path = require("path");
const { findOne, findOneAndUpdate } = require("../models/user");
const pathFrontend = path.join(path.resolve(), "/frontend");

function index(req, res) {
  if (req.session.username) {
    res.send(
      `Welcome ${req.session.username} <a href='http://localhost:3000/api/users/logOut'>click to logout</a>`
    );
  } else res.sendFile(`${pathFrontend}/api/`);
}

const usersGet = async (req, res) => {
  try {
    const { id, limit = 5, offset = 0 } = req.query;
    const query = { active: true };
    if (id) return res.json(await User.findById(id));

    let [count, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(offset).limit(limit),
    ]);

    res.json({ count, users });
  } catch (err) {
    res.send("Ocurrio un error al buscar un usuario");
  }
};

const usersPost = async (req, res) => {
  try {
    // Creacion de un nuevo usuario
    let newUser = new User({ ...req.body });
    await newUser.save();
    req.session.username = newUser.username;
    res.json(newUser);
  } catch (err) {
    res.send("Ocurrio un error al crear un nuevo usuario");
  }
};

const usersUpdate = async (req, res) => {
  try {
    let id = req.params.id;

    // Actualizar el usuario
    let user = await User.findByIdAndUpdate(id, { ...req.body });
    res.json(user);
  } catch (err) {
    res.send("Ocurrio un error al obtener al actualizar un nuevo usuario");
  }
};

const usersDelete = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findOneAndUpdate({ _id: id }, { active: false });
    res.json(user);
  } catch (err) {
    res.send("Ocurrio un error al eliminar un usuario");
  }
};

const signIn = async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });

    if (user && user.active) {
      if (user.password === password) {
        req.session.username = username;
        res.json(user);
      } else res.send("Verifique los datos");
    } else res.send("Usuario no encontrado");
  } catch (err) {
    res.send("Ocurrio un problema al loguarse");
  }
};

const viewSignUp = (_, res) => res.sendFile(`${pathFrontend}/sign_up.html`);

const viewSignIn = (_, res) => res.sendFile(`${pathFrontend}/log_in.html`);

const logOut = (req, res) => {
  req.session.destroy();
  res.redirect("/api/");
};

module.exports = {
  index,
  viewSignUp,
  viewSignIn,
  logOut,
  usersGet,
  usersPost,
  usersUpdate,
  usersDelete,
  signIn,
};
