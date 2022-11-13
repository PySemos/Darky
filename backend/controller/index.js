const path = require("path");
const pathFrontend = path.join(path.resolve(), "/frontend");

const index = (req, res) => {
  if (req.session.username) {
    res.send(
      `Welcome ${req.session.username} <a href='http://localhost:3000/logOut'>click to logout</a>`
    );
  } else res.sendFile(`${pathFrontend}/api/`);
};

module.exports = {
  index,
};
