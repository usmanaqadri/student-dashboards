import React, { Component } from 'react'
// import Dashboard from '../../../../backend/models/Dashboard';

async function fetchDashboards() {
  const response = await fetch(
    `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard`
  );
  const dashboards = await response.json();
  return dashboards;
  
}

let baseURL = process.env.BACKEND_PORT

class StudentId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboards: [],
    };
  }
componentDidMount() {
  this.getDashbaord();
  fetchDashboards();
};


getDashbaord = () => {
  fetch( `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard`)
  .then((res)=>{
    if(res.status === 200){
      return res.json();
    }else {
      return[];
    }
  })
  .then((data)=>{
    console.log('data', data);
    this.setState({ dashboards: data.dashboards});
  })
}

// export class StudentIndex extends Component {
  render() {
    
    return (
      <div className ='studentdashboard'>
        {/* <h1>{dashboard.studentName}</h1> */}
        <table>
          <tbody>
            {this.state.dashboards.map((dashboard)=>{
              return(
                
                 <tr key ={dashboard._id}>
                    <h1>{dashboard.studentName}'s Dashboard</h1>
                  {/* <td>{dashboard.studentName}</td> */}
                  <td><h3>Enrolled</h3>{dashboard.isEnrolled}</td>
                 <td><h3>Class</h3> {dashboard.className}</td>
                  <td><h3>Assignments</h3>{dashboard.assignments}</td>


            </tr>
              )})}
              </tbody>
        </table>
       
        
      </div>

    )
  }
}

export default StudentId