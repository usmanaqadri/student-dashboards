//require express
const express = require("express");
//define router
const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is the index of students in the class");
});

module.exports = router;
