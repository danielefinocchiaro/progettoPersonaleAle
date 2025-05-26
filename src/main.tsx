import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
const root = document.getElementById("root");
if (!root) {
  throw Error("");
}
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
