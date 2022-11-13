/* Middleware that watch the session */
const session_watcher = (req, res, next) => {
  if (!req.session.username) res.redirect("/signIn");
  else next();
};

module.exports = {
  session_watcher,
};
