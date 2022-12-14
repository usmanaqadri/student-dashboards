import React, { Component } from "react";
import { Link } from "react-router-dom";

export class AllStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboards: [],
    };
  }
  componentDidMount() {
    this.getDashboard();
  }

  getDashboard = () => {
    fetch(
      process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard`
        : "https://student-dashboards.herokuapp.com/studentDashboard"
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        this.setState({ dashboards: data.dashboards });
      });
  };
  render() {
    return (
      <div className="student-dashboard">
        <h1>Students</h1>
        <table border="0" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Status</th>
              <th>Current Grade</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dashboards.map((dashboard) => {
              return (
                <tr key={dashboard._id}>
                  <td>
                    <Link to={`/${dashboard._id}`}>
                      {dashboard.studentName}
                    </Link>
                  </td>
                  <td> {dashboard.className}</td>
                  <td>{dashboard.isEnrolled ? "Enrolled" : "Dropout"}</td>
                  <td>
                    {dashboard.assignments.length === 0
                      ? "No assignments yet"
                      : "something else"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AllStudents;
