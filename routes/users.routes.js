//require express
const express = require("express");
//define router
const router = express.Router();

const ctrls = require("../controllers");

//GET route brings user to a register page
router.post("/register", ctrls.users.register);

//GET route to home page that will redirect user to a log in page
router.post("/signin", ctrls.users.signIn);

router.post("/", ctrls.users.checkUser);

module.exports = router;
