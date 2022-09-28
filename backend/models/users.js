const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  isAdmin: Boolean,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
