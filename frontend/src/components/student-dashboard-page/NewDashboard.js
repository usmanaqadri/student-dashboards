import React, { Component } from "react";
import Header from "../Headers/RootHeader/Header";

export class NewDashboard extends Component {
  
  render() {
    return (
      <div>
        <Header />
        NewDashboard
        <form>
          <label htmlFor="name">Student Name:</label>
          <input 
            type = "text"
            id="studentName"
            name= "name"
            placeholder="Students Name"
            />
             <label htmlFor="name">Class:</label>
             < input
             type="text"
             id="className"
             name="class"
             placeholder="Class Name"
             />
              <label htmlFor="name">Enrolled:</label>
              <input
              type="boolean"
              id="isEnrolled"
              boolean="Enrolled"
              placeholder="Are they Enrolled?"
              />
              <input type='submit' value="Add Student"/>
        </form>
      </div>
    );
  }
}

export default NewDashboard;
