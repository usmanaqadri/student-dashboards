import React, { Component } from "react";
import Header from "../Headers/RootHeader/Header";
import Dashboard from "./Dashboard";
import Verification from "../../User-Pages/Verification";

export default function Show() {
  Verification();
  return (
    <div>
      <Dashboard />
    </div>
  );
}
