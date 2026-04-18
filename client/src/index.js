import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initTheme } from "./theme";
import './index.css';               /* base resets — must come BEFORE MASTER */
import "./jsComponentsCSS/MASTER.css"; /* design tokens + font — wins over index.css */
import "./assets/images/icons/uicons-bold-rounded/css/uicons-bold-rounded.css";
import reportWebVitals from './reportWebVitals';

// Initialize theme BEFORE rendering
initTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();