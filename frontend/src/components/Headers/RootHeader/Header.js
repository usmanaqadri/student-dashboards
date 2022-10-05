import React, { Component } from "react";
import Nav from "./Nav";

export class Header extends Component {
  render() {
    return (
      <header>
        <Nav />
        <h1>Student Dashboards</h1>
      </header>
    );
  }
}

export default Header;
