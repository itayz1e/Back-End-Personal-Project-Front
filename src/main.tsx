import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./routerPage";
import NavBar from "./components/NavBar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <RouterConfig />
    </BrowserRouter>
  </React.StrictMode>
);
