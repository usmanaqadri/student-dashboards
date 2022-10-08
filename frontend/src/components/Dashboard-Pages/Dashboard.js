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
      process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard/${id}`
        : `https://student-dashboards.herokuapp.com/studentDashboard/${id}`
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

  handleDelete = () => {
    const { id } = this.props.params;
    fetch(
      process.env.NODE_ENV === "development"
        ? `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard/${id}`
        : `https://student-dashboards.herokuapp.com/studentDashboard/${id}`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      if (response.status === 200) {
        window.location.href = window.location.href.split(id)[0];
      }
    });
  };

  render() {
    return (
      <>
        <div className="personal-dashboard">
          <h1>{this.state.studentName}'s Dashboard</h1>
          <table border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td width={"33%"}>
                  <h3>Status</h3>
                  {this.state.isEnrolled ? "Enrolled" : "Dropout"}
                </td>
                <td width={"33%"}>
                  <h3>Class</h3> {this.state.className}
                </td>
                <td width={"33%"}>
                  <h3>Current Grade</h3>
                  {this.state.assignments.length === 0
                    ? "No assignments yet"
                    : "something else"}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="redirect">
            <Link className="edit" to={`/${this.props.params.id}/edit`}>
              Edit
            </Link>
            <Link className="delete" onClick={this.handleDelete} to={`/`}>
              Delete
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default withParams(Dashboard);
