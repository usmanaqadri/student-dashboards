//require express
const express = require("express");
//define router
const router = express.Router();

const ctrls = require("../controllers");

//GET route brings user to a register page
router.post("/register", ctrls.users.register);

router.get("/signin", ctrls.users.signInPage);

router.get("/register", ctrls.users.registerPage);

//GET route to home page that will redirect user to a log in page
router.post("/signin", ctrls.users.signIn);

//GET route to sign out of page
router.get("/signout", ctrls.users.signOut);

module.exports = router;
