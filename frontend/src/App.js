import "./App.css";

async function fetchDashboards() {
  const response = await fetch(
    `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/studentDashboard`
  );
  const dashboards = await response.json();
  return dashboards;
}

function App() {
  fetchDashboards().then((data) =>
    console.log("here are the dashboards", data.dashboards)
  );

  return <div className="App">React App</div>;
}

export default App;
