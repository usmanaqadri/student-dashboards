import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Authenticate from "./Authenticate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Authenticate />
    {/* <App /> */}
  </React.StrictMode>
);
