import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "./Context/AppContextProvider";
import { ReactLenis } from "lenis/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppContextProvider>
    <ReactLenis root>
      <Router>
        <App />
      </Router>
    </ReactLenis>
  </AppContextProvider>,
);
