import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Signin from './Pages/Signin';
import Secret from './Pages/Secret';

export default function Authenticate() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/" element={<Secret />} />
        </Routes>
      </BrowserRouter>
    );
  }