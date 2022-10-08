const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // email is created, it is a string, it is required and it must not be the same as another user's email
  password: String, // password is a string
  isAdmin: Boolean, // boolean determining if it is an admin user. Not doing anything with this boolean value yet
});

UserSchema.pre("save", async function (next) { // pre is a hook by mongo that will operate before the schema is saved to the database. The async function will be a promise based function. The function calls next to call the middleware inside the function.
  const salt = await bcrypt.genSalt(); // this defines a variable that uses bcrypt to add a series of letters and numbers to a string and then turn the string into unintelligible characters. Await is called so the function waits until the whole password is encrypted.
  this.password = await bcrypt.hash(this.password, salt); // the object's password is being encrypted with the hash function and is passing the password and the salt
  next(); // used to call any other middleware we may need
});

UserSchema.statics.login = async function (email, password) { // statics is used to define a function that exist directly on the model. This is a login function that is going to be on the model to find the user by email and authorize the password.
  const user = await this.findOne({ email }); // defining a variable to find a user by email
  if (user) { // if the email is found
    const auth = await bcrypt.compare(password, user.password); // variable that waits until bcrypt can pull the salt out of the hash and hash the password. This then compares the password entered to the password that is in the schema
    if (auth) { // if the entered password is the same as the user schema password
      return user; // return the user and end the function
    }
    throw Error("Incorrect Password"); // if bcrypt cannot confirm the two passwords are the same then throw will stop the function and show the error incorrect password
  }
  throw Error("Incorrect Email"); // if mongoose cannot find the user by email, then throw will stop the function and throw the error incorrect email
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
