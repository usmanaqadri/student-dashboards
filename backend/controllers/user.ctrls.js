const { User } = require("../models");
const jwt = require("jsonwebtoken");

const timeLimit = 1 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SESSION_SECRET, {
    expiresIn: timeLimit,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.code === 11000) {
    errors.email = "Email is already Registered";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const signInPage = (req, res) => {
  res.send("sign in page");
};

const registerPage = (req, res) => {
  res.send("register page");
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      TimeLimit: timeLimit * 1000,
    });
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

const signIn = async (req, res, next) => {};

const signOut = (req, res) => {
  req.session.destroy();
  res.redirect("/signin");
};

module.exports = { register, signIn, signOut, signInPage, registerPage };
