import React, { Component } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/student-dashboard-page/Dashboard";
import Edit from "./components/student-dashboard-page/Edit";
import NewDashboard from "./components/student-dashboard-page/NewDashboard";
import "./App.css";

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
    // return <div className="App">Hello</div>;
    return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboards</Link>
            </li>
            <li>
              <Link to="/">New Dashboard</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewDashboard />} />
          <Route path="/:id" element={<Dashboard />} />
          <Route path="/:id/edit" element={<Edit />} />
        </Routes>
      </>
    );
  }
}

export default App;
