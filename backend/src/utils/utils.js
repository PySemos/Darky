function session_watcher(req, res, next) {
    console.log("/")
    if (!req.session.username) res.redirect("/signIn");
    else next();
  }

module.exports = {
    "session_watcher":session_watcher
}