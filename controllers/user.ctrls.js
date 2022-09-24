const bcrypt = require("bcrypt");

const db = require("../models");

const signInPage = (req, res) => {
  res.send("sign in page");
};

const registerPage = (req, res) => {
  res.send("register page");
};

const register = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  db.User.findOne({ username: req.body.username }, (err, userExists) => {
    if (userExists) {
      res.send("that username is taken");
    } else {
      db.User.create(req.body, (err, createdUser) => {
        req.session.currentUser = createdUser;
        res.redirect("/studentDashboard");
      });
    }
  });
};

const signIn = (req, res) => {
  db.User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (foundUser) {
      const validLogin = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );
      if (validLogin) {
        req.session.currentUser = foundUser;
        res.redirect("/studentDashboard");
      } else {
        res.send("Invalid username or password");
      }
    } else {
      res.send("Invalid username or password");
    }
  });
};

const signOut = (req, res) => {
  req.session.destroy();
  res.redirect("/signin");
};

module.exports = { register, signIn, signOut, signInPage, registerPage };
