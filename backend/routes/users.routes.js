//require express
const express = require("express");
//define router
const router = express.Router();

const ctrls = require("../controllers");

//POST route brings user to a register page and calls the register function
router.post("/register", ctrls.users.register);

//POST route to sign in page that calls sign in function
router.post("/signin", ctrls.users.signIn);

//POST route to home page that calls the check user function
router.post("/", ctrls.users.checkUser);

module.exports = router;
