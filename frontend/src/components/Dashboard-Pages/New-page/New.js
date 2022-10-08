import React from "react";
import Header from "../../Headers/RootHeader/Header";
import Verification from "../../../User-Pages/Verification";
import NewDashboard from "./NewDashboard";

export default function New() {
  Verification();
  return (
    <div>
      <Header />
      <NewDashboard />
    </div>
  );
}
