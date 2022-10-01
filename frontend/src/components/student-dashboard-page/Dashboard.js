import React, { Component } from "react";
import Header from "../Headers/RootHeader/Header";

export class Dashboard extends Component {
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
    return (
      <>
        <Header />
        <div className="studentdashboard">
          {/* <h1>{dashboard.studentName}</h1> */}
          <table>
            <tbody>
              {this.state.dashboards.map((dashboard) => {
                return (
                  <tr key={dashboard._id}>
                    <h1>{dashboard.studentName}'s Dashboard</h1>
                    {/* <td>{dashboard.studentName}</td> */}
                    <td>
                      <h3>Enrolled:</h3>
                      {dashboard.isEnrolled}
                    </td>
                    <td>
                      <h3>Class:</h3> {dashboard.className}
                    </td>
                    <td>
                      <h3>Assignments:</h3>
                      {dashboard.assignments}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Dashboard;
