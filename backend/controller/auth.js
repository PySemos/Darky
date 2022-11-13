const path = require("path");

const pathFrontend = path.join(path.resolve(), "/frontend");

const User = require("../models/user");

const signIn = async (req, res) => {
  try {
    let { username, password } = req.body;

    //
    let user = await User.findOne({ username });
    
    if (user && user.active) {
      if (await user.validatePassword(password)) {
        req.session.username = username;
        res.json({
          sucess:true,
          user:user
        });
      } else res.json({ sucess: false, error: "Check the data" });
    } else res.status(404).json({ sucess: false, error: "User not found" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "There was a problem logging in" });
  }
};

const viewSignUp = (_, res) => res.sendFile(`${pathFrontend}/sign_up.html`);

const viewSignIn = (_, res) => res.sendFile(`${pathFrontend}/log_in.html`);

const viewlogOut = (req, res) => {
  req.session.destroy()
  return res.redirect("/")
}

const logOut = (req, res) => {
  try{

    req.session.destroy();
    return res.json({
      sucess:true
    });
  }
  catch{
    return res.json({sucess:false})
  }
};

module.exports = {
  signIn,
  viewSignIn,
  viewSignUp,
  logOut,
  viewlogOut
};
