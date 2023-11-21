import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./Routes";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
