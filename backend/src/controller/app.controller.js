const path = require("path");
const pathFrontend = path.join(process.cwd(), "../../frontend");

function index(req, res) {
    if (req.session.username) {
      res.send(
        `Welcome ${req.session.username} <a href='http://localhost:3000/api/log_out'>click to logout</a>`
      );
    } else res.sendFile(`${pathFrontend}/api/`);
  }
function viewSignUp(req, res) {
  res.sendFile(`${pathFrontend}/sign_up.html`);
}

function viewSignIn(req, res) {
  res.sendFile(`${pathFrontend}/log_in.html`);
}

module.exports = {
    index,
    viewSignIn,
    viewSignUp,
}