//require express
const express = require("express");
//define router
const router = express.Router();

//GET route to home page that will redirect user to a log in page
router.get("/", (req, res) => {
  res.send("this is the log in page");
});

//GET route to show index of students in class
router.get("/studentDashboard", (req, res) => {
  res.send("this is the index of students in the class");
});

//GET route to render a form to be able to submit a new student to the class with hmwk,projects,attendance
router.get("/studentDashboard/new", (req, res) => {
  res.send("this is where you can submit a new student");
});

//GET route to render a page to show a student and their hmk,attendence,projects
router.get("/studentDashboard/:id", (req, res) => {
  res.send("this is where the students info is held");
});


module.exports = router;
