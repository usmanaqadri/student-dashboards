import React, { Component } from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Books</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </>
    );
  }
}

export default App;
