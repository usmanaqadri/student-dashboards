import React, { Component } from "react";
import Header from "../Headers/RootHeader/Header";
import Verification from "../../User-Pages/Verification";

export default function NewDashboard() {
  Verification();
  return (
    <div>
      <Header />
      NewDashboard
    </div>
  );
}
