import React, { Component } from "react";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      className: "",
      studentName: "",
      isEnrolled: false,
    };
  }
  componentDidMount() {
    const { id } = this.props.params;
    this.getDashboard(id);
  }

  getDashboard = (id) => {
    fetch(
      `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard/${id}`
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        this.setState({
          assignments: data.dashboard.assignments,
          className: data.dashboard.className,
          studentName: data.dashboard.studentName,
          isEnrolled: data.dashboard.isEnrolled,
        });
      });
  };

  handleChange = (event) => {
    if (event.target.name === "isEnrolled") {
      this.setState({ isEnrolled: !this.state.isEnrolled });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { id } = this.props.params;
    fetch(
      process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard/${id}`
        : `https://student-dashboards.herokuapp.com/studentDashboard/${id}`,
      {
        method: "PUT",
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
        window.location.href = window.location.href.split("edit")[0];
      }
    });
  };
  render() {
    return (
      <div>
        <h1>Edit {this.state.studentName}'s Dashboard</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="studentName">Student Name: </label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            onChange={(event) => this.handleChange(event)}
            value={this.state.studentName}
          />
          <label htmlFor="className">Class Name: </label>
          <input
            type="text"
            id="className"
            name="className"
            onChange={(event) => this.handleChange(event)}
            value={this.state.className}
          />
          <label htmlFor="isEnrolled">Enrolled?: </label>
          <input
            type="checkbox"
            id="isEnrolled"
            name="isEnrolled"
            onChange={(event) => this.handleChange(event)}
            checked={this.state.isEnrolled}
          />
          <button>Submit your changes</button>
        </form>
      </div>
    );
  }
}

export default withParams(EditForm);
