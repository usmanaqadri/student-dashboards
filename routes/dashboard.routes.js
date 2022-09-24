//require express
const express = require("express");
//define router
const router = express.Router();

const ctrls = require("../controllers");

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

// POST route to create a new student
router.post("/studentDashboard", ctrls.dashboards.create);

module.exports = router;
