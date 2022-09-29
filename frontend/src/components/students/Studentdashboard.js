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

class StudentIndex extends Component {
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
        <h1>STUDENT DASHBOARD</h1>
        <table>
          <tbody>
            {this.state.dashboards.map((dashboard)=>{
              return(
                 <tr key ={dashboard._id}>
                  <td>{dashboard.studentName}</td>

            </tr>
              )})}
              </tbody>
        </table>
       
        
      </div>

    )
  }
}

export default StudentIndex