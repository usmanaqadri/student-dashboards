import React, { Component } from "react";
import "./App.css";
import StudentIndex from './components/students/Studentdashboard';
import StudentId from './components/students/studentID';


async function fetchDashboards() {
  const response = await fetch(
    `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard`
  );
  const dashboards = await response.json();
  return dashboards;
 
}

class App extends Component {
  render() {
    fetchDashboards().then((data) =>
      console.log("here are the dashboards", data.dashboards)
    );
    return (
    <div className="app">
      
      <StudentIndex />
      <StudentId />
    </div>
    
      )
  }
}

export default App;
