const mongoose = require("mongoose");

//  CREATE SCHEMA

const DashboardSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  className: { type: String, required: true },
  isEnrolled: { type: Boolean, required: true },
  currentGrade: { type: Number },
  attendance: { type: Number },
  assignments: [
    { name: String, dueDate: Date, grade: Number, comments: String },
  ],
});

// CREATE MODEL

const Dashboard = mongoose.model("Dashboard", DashboardSchema);

module.exports = Dashboard;
