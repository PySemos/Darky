const User = require("../models/user.model");
const path = require("path");
const { json } = require("express");
const pathFrontend = path.join(process.cwd(), "../../../frontend");


async function getUser(req, res) {
  const id = req.param
}

async function getUsers(req, res) {
  try {
    let users = await User.find();

    return res.json({ success:true, body: users });
  } catch (err) {
    return res.json({
      success:false,
      error:"Something happened with the request"
    });
  }
}

async function addUser(req, res) {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      let newUser = new User({ username, email, password });

      await newUser.save();
      req.session.username = username;
      return res.json({
        sucess:true
      });
    } else {
      return res.status(403).json({
        success:true,
        error:"An user with the same data already exists"
      });
    }
  } catch (err) {
    return res.json({
      error:"Something happened with the sign up"
    });
  }
}

async function signIn(req, res) {
  try {
    let { username, password } = req.body;
    let user = await User.findOne({ username });

    if (user) {
      if (user.password === password) {
        req.session.username = username;
        return res.json({"success":true});
      } else res.json({
        sucess:false,
        error:"Data corrupted"
      });
    } else return res.status(404).json({
      success:false,
      error:"Can't find that user"
    });
  } catch (err) {
    res.json({
      success:false,
      error:"Something happened with log in"
    });
  }
}

function logOut(req, res) {
  try{
    req.session.destroy();
    res.redirect("/");
  }catch(error){
    return res.json({
      success:false,
      error:"Can't log out the user"
    })
  }
}

module.exports = {
  logOut,
  getUser,
  getUsers,
  addUser,
  signIn,
};
