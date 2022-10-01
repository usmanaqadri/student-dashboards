import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/student-dashboard-page/Dashboard";
import Edit from "./components/student-dashboard-page/Edit";
import NewDashboard from "./components/student-dashboard-page/NewDashboard";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
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
