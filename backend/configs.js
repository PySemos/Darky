module.exports = {
  db_dev: "mongodb://localhost:27017/chat",
  db_prouction: "",
  option_session: {
    secret: "secret",
    cookie: {
      maxAge: 100000,
    },
    saveUninitialized: true,
    resave: false,
  },
};
