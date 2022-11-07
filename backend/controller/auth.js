const path = require("path");

const pathFrontend = path.join(path.resolve(), "/frontend");

const User = require("../models/user");

const signIn = async (req, res) => {
  try {
    let { username, password } = req.body;

    //
    let user = await User.findOne({ username });

    if (user && user.active) {
      if (user.password === password) {
        req.session.username = username;
        res.json(user);
      } else res.json({ success: false, msg: "Check the data" });
    } else res.status(404).json({ success: false, msg: "User not found" });
  } catch (err) {
    res
      .json(500)
      .json({ success: false, msg: "There was a problem logging in" });
  }
};

const viewSignUp = (_, res) => res.sendFile(`${pathFrontend}/sign_up.html`);

const viewSignIn = (_, res) => res.sendFile(`${pathFrontend}/log_in.html`);

const logOut = (req, res) => {
  req.session.destroy();
  res.redirect("/api/");
};

module.exports = {
  signIn,
  viewSignIn,
  viewSignUp,
  logOut,
};
