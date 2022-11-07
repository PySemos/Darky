const session_watcher = (req, res, next) => {
  if (!req.session.username) res.send("No puedes acceder a esta pagina");
  else next();
};

module.exports = {
  session_watcher,
};
