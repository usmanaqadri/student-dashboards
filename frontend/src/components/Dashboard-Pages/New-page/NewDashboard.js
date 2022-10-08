import React, { Component } from "react";

export class NewDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      className: "",
      studentName: "",
      isEnrolled: false,
    };
  }
  handleChange = (e) => {
    if (e.target.name === "isEnrolled") {
      this.setState({ isEnrolled: !this.state.isEnrolled });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard/`
        : `https://student-dashboards.herokuapp.com/studentDashboard/`,
      {
        method: "POST",
        body: JSON.stringify({
          studentName: this.state.studentName,
          className: this.state.className,
          isEnrolled: this.state.isEnrolled,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.status === 200) {
        window.location.href = window.location.href.split("new")[0];
      }
    });
  };
  render() {
    return (
      <div className="personal-dashboard">
        <h1>Create a new student</h1>
        <form className="dashboard-form" onSubmit={this.handleSubmit}>
          <label>
            <p>Student Name:</p>
            <input
              type="text"
              id="studentName"
              name="studentName"
              required
              value={this.state.studentName}
              onChange={(e) => this.handleChange(e)}
              placeholder="Students Name"
            />
          </label>
          <label>
            <p>Class Name:</p>
            <input
              type="text"
              required
              name="className"
              value={this.state.className}
              onChange={(e) => this.handleChange(e)}
              placeholder="Class Name"
            />
          </label>
          <label>
            <p>Enrolled:</p>
            <input
              type="checkbox"
              // required
              name="isEnrolled"
              checked={this.state.isEnrolled}
              onChange={(e) => this.handleChange(e)}
              placeholder="Are they Enrolled?"
            />
          </label>
          <button>Add student</button>
        </form>
      </div>
    );
  }
}

export default NewDashboard;
