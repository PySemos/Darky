const db_password = "vFy38WpAQ8ccwr2o"

module.exports = {
  /* db_dev: "mongodb://localhost:27017/Darky", */
  db_dev:`mongodb+srv://Semos:${db_password}@darky0.vpx4mah.mongodb.net/?retryWrites=true&w=majority`,
  db_prouction: "",
  option_session: {
    secret: "secret",
    cookie: {
      maxAge: 100000,
    },
    saveUninitialized: true,
    resave: true,
  },
};
