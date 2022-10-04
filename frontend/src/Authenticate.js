import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Sign in Pages/Register";
import Signin from "./Sign in Pages/Signin";
import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";

export default function Authenticate() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
