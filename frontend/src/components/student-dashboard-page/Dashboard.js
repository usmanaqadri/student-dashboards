import React, { Component } from "react";
import Header from "../Headers/RootHeader/Header";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: "",
      assignments: [],
      className: "",
      studentName: "",
      isEnrolled: false,
    };
  }
  componentDidMount() {
    this.getDashboardId();
    this.getDashboard();
  }

  componentDidUpdate() {
    this.getDashboard();
  }

  getDashboardId = () => {
    this.setState({
      studentId:
        window.location.href.split("/")[
          window.location.href.split("/").length - 1
        ],
    });
  };

  getDashboard = () => {
    fetch(
      `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard/${this.state.studentId}`
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

  render() {
    return (
      <>
        <Header />
        <div className="studentdashboard">
          {/* <h1>{dashboard.studentName}</h1> */}
          <table>
            <tbody>
              <tr>
                <h1>{this.state.studentName}'s Dashboard</h1>
                {/* <td>{dashboard.studentName}</td> */}
                <td>
                  <h3>Enrolled:</h3>
                  {this.state.isEnrolled ? "Enrolled" : "Dropout"}
                </td>
                <td>
                  <h3>Class:</h3> {this.state.className}
                </td>
                <td>
                  <h3>Assignments:</h3>
                  {this.state.assignments.length === 0
                    ? "No assignments yet"
                    : "something else"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Dashboard;
