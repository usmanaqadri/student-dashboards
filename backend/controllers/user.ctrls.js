// requiring imports
const { User } = require("../models");
const jwt = require("jsonwebtoken");

// defining time limit for token by days, hours, minutes and seconds. This token is 1 day
const timeLimit = 1 * 24 * 60 * 60;

const createToken = (id) => {
  //creates token that takes user id from mongodb as a parameter
  return jwt.sign({ id }, process.env.SESSION_SECRET, {
    //returns a new token with the user id and the uses the session secret to decrypt the token and maintain the current session
    expiresIn: timeLimit, // time limit where the token expires
  });
};

const handleErrors = (err) => {
  // variable to show user what error they received and why. Takes err as a parameter
  let errors = { email: "", password: "" }; // defining errors that is looking for the correct email and password for the session

  if (err.message === "Incorrect Email")
    // if the error includes incorrect email
    errors.email = "That email is not registered"; // the email wasn't registered

  if (err.message === "Incorrect Password")
    // if the error includes incorrect password
    errors.password = "That password is incorrect"; // the password is wrong

  if (err.code === 11000) {
    // if mongo renders a code that is 11000
    errors.email = "Email is already Registered"; // the email is a duplicate email and is already in the datababse
    return errors; // return the error so the backend doesn't crash and the function ends there
  }
  if (err.message.includes("Users validation failed")) {
    // users validation failed message comes up alongside all of these messages
    Object.values(err.errors).forEach(({ properties }) => {
      // for each error in this function, we will destructure the properties of the function
      errors[properties.path] = properties.message; // the errors properties will then go through this function and find the error that matches and pass that message
    });
  }
  return errors; // return errors so backend doesn't crash and error messages are returned
};

const register = async (req, res, next) => {
  // next is called alongside request and response because there are functions and properties in this function that don't just utilize express
  try {
    // try hook
    const { email, password } = req.body; // gets the email and password that the user types in the form in the request body
    const user = await User.create({ email, password }); // waits until a new user is created with an email and password
    const token = createToken(user._id); // new jwt token is created with the user id

    res.cookie("jwt", token, {
      // sets cookie name to the value with jwt and the token created with the user id above
      withCredentials: true, // with credentials is a boolean value that if true will allow the user to go accross the site with the cookie they generated
      httpOnly: false, // without http only, the site will not be able to see the cookie's value. Http only will only allow the cookie to be accessed by the server and will not allow javascript functions to read the cookie, which we need in order for the website to work
      TimeLimit: timeLimit * 1000, // time limit in cookie is read in milliseconds so we multiply the time limit by 1000
    });
    res.status(201).json({ user: user._id, created: true }); // a 201 status code means the request was fulfilled and the resource was created. In this case the user id was created
  } catch (err) {
    // if an error was caught, the function doesn't run
    console.log(err); // console log the error
    const errors = handleErrors(err); // if an error was caught, show the error message that we created above
    res.json({ errors, created: false }); // the user wasn't created and an error is being read
  }
};

const signIn = async (req, res, next) => {
  // sign in function with next
  try {
    // try hook
    const { email, password } = req.body; // gets the email and password that the user types in the form in the request body
    const user = await User.login(email, password); // awaits user function in models to run all the way through with the email and password
    const token = createToken(user._id); // new jwt token is created with the user id

    res.cookie("jwt", token, {
      // sets cookie name to the value with jwt and the token created with the user id above
      withCredentials: true, // with credentials is a boolean value that if true will allow the user to go accross the site with the cookie they generated
      httpOnly: false, // without http only, the site will not be able to see the cookie's value. Http only will only allow the cookie to be accessed by the server and will not allow javascript functions to read the cookie, which we need in order for the website to work
      TimeLimit: timeLimit * 1000, // time limit in cookie is read in milliseconds so we multiply the time limit by 1000
    });
    res.status(200).json({ user: user._id, created: true }); // a 200 status code means the request was fulfilled and the routes can now be included in this request. With 201 they were created but in this the routes exist and can now be used.
  } catch (err) {
    // if an error was caught, the function doesn't run
    console.log(err); // console log the error
    const errors = handleErrors(err); // if an error was caught, show the error message that we created above
    res.json({ errors, created: false }); // the user wasn't created and an error is being read
  }
};

const checkUser = (req, res, next) => {
  // check user function with next
  const token = req.cookies.jwt; // token is the cookie with the jwt value stored in the request
  if (token) {
    // if there's a token
    jwt.verify(token, process.env.SESSION_SECRET, async (err, decodedToken) => {
      // verify the token, decode it with the session secret and run the function with an error and a decoded token as the parameters with async
      if (err) {
        // if there's an error
        res.json({ status: false }); // the json response will be converted to a false status
        next(); // run the next function to see if there's any middleware that will resolve the error
      } else {
        const user = await User.findById(decodedToken.id); // wait for the user to be found in the mongo database with the decoded token and id
        if (user)
          res.json({
            status: true,
            user: user.email,
          }); // if the user is found, the json response will be converted to a true status and the user will be identified by the email in the user data
        else res.json({ status: false }); // otherwise set the json status to false
        next(); // run next to see if middleware will resolve issue
      }
    });
  } else {
    // if there isn't a token
    res.json({ status: false }); // the json response will set the status to false
    next(); // run next to see if middleware will resolve issue
  }
};

module.exports = {
  // exporting functions
  register,
  signIn,
  checkUser,
};
