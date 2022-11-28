const path = require("path");
const pathFrontend = path.join(path.resolve(), "/frontend");

const index = (req, res) => {
  if (req.session.username) {
    res.sendFile(path.resolve(__dirname,"../../frontend/index.html"));
  } else res.sendFile(`${pathFrontend}/api/`);
};

module.exports = {
  index,
};
