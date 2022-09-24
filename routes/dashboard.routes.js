//require express
const express = require("express");
//define router
const router = express.Router();

const ctrls = require("../controllers");

//GET route to home page that will redirect user to a log in page
router.get("/", (req, res) => {
  res.send("this is the log in page");
});

//GET route to show index of students in class
router.get("/studentDashboard", ctrls.dashboards.index);

//GET route to render a form to be able to submit a new student to the class with hmwk,projects,attendance
router.get("/studentDashboard/new", (req, res) => {
  res.send("this is where you can submit a new student");
});

//GET route to render a page to show a student and their hmk,attendence,projects
router.get("/studentDashboard/:id", (req, res) => {
  res.send("this is where the students info is held");
});

//GET route to edit a current student
router.get("/studentDashboard/:id/edit", (req, res) => {
  res.send("this is where you can edit a student");
});

//GET route brings user to a register page
router.get("/users/register", (req, res) => {
  res.send("this is where you will register");
});

//GET route to render a sign in page
router.get("/users/signin", (req, res) => {
  res.send("this is where you sign in");
});

// SEED route to put in some dummy data
router.post("/studentDashboard", ctrls.dashboards.seed);

module.exports = router;
