import React, { Component } from "react";
import Header from "./Headers/RootHeader/Header";
import AllStudents from "./AllStudents";
import Verification from "../User-Pages/Verification";

export default function Home() {
  Verification();
  return (
    <div>
      <Header />
      <AllStudents />
    </div>
  );
}
