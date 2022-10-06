import React, { Component } from "react";
import Header from "../Headers/RootHeader/Header";

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
      `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard`,
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
      if(response.status === 200) {
        window.location.href = window.location.href.split("new")[0];
      }
    });
  };
  render() {
    return (
      <div>
        <Header />
        NewDashboard
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Student Name:</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            required
            value={this.state.studentName}
            onChange={(e) => this.handleChange(e)}
            placeholder="Students Name"
          />
          <label htmlFor="name">Class:</label>
          <input
            type="text"
            required
            name="className"
            value={this.state.className}
            onChange={(e) => this.handleChange(e)}
            placeholder="Class Name"
          />
          <label htmlFor="name">Enrolled:</label>
          <input
            type="checkbox"
            // required
            name="isEnrolled"
            checked={this.state.isEnrolled}
            onChange={(e) => this.handleChange(e)}
            placeholder="Are they Enrolled?"
          />
          <input type="submit" value="Add Student" />
        </form>
      </div>
    );
  }
}

export default NewDashboard;
