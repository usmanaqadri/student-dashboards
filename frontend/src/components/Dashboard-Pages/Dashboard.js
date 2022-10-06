import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export class Dashboard extends Component {
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

  render() {
    return (
      <>
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
          <div className="redirect">
            <Link to={`/${this.props.params.id}/edit`}>Edit</Link>
          </div>
        </div>
      </>
    );
  }
}

export default withParams(Dashboard);
