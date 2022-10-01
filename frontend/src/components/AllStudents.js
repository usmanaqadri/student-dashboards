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
      `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard`
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
    console.log("hey what is in my state?", this.state.dashboards);
    return (
      <div className="student-dashboard">
        <h1>STUDENT DASHBOARD</h1>
        <table>
          <tbody>
            {this.state.dashboards.map((dashboard) => {
              return (
                <tr key={dashboard._id}>
                  <td>
                    <Link to="/dashboard">{dashboard.studentName}</Link>
                  </td>
                  {/* <td> {dashboard.className}</td>
              <td>{dashboard.isEnrolled}</td>
              <td>{dashboard.assignments}</td> */}
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
