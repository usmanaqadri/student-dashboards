import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Show from "./components/Dashboard-Pages/Show";
import Edit from "./components/Dashboard-Pages/Edit-page/Edit";
import NewDashboard from "./components/Dashboard-Pages/New-page/New";
import "./App.css";
import Register from "./User-Pages/Register";
import Signin from "./User-Pages/Signin";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewDashboard />} />
          <Route path="/:id" element={<Show />} />
          <Route path="/:id/edit" element={<Edit />} />
        </Routes>
      </>
    );
  }
}

export default App;
