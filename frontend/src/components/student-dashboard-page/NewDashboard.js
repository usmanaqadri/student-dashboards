import React, { Component } from "react";
import Header from "../Headers/RootHeader/Header";
import{useState} from 'react'

  
 const NewDashboard =()=>{
  const [studentName, setStudentName]= useState('');
  const [className, setClassName]= useState('');
  const [isEnrolled, setIsEnrolled]= useState('');

  const handleSubmit =(e)=>{
    e.preventDefault();
    const student = {studentName, className, isEnrolled};
    fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard`, {
      method:'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(student)

    }).then(()=>{
      console.log('New Student Added')
    })
  }
  return (
    <div>
      <Header />
      NewDashboard
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Student Name:</label>
        <input 
          type = "text"
          required
          value ={studentName}
          onChange={(e) =>setStudentName(e.target.value)}
          placeholder="Students Name"
          />
           <label htmlFor="name">Class:</label>
           < input
           type="text"
           required
           value={className}
           onChange={(e) =>setClassName(e.target.value)}
           placeholder="Class Name"
           />
            <label htmlFor="name">Enrolled:</label>
            <input
            type="boolean"
            required
            value={isEnrolled}
            onChange={(e) =>setIsEnrolled(e.target.value)}
            placeholder="Are they Enrolled?"
            />
            <input type='submit' value="Add Student"/>
      </form>
    </div>
  );
 }

export default NewDashboard;
