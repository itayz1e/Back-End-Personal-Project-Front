import { Route, Router, Routes } from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConnectingDB from "./pages/ConnectingDB";

export const router = [
  <>
    <Routes>
      <Route key="home" path={"/"} element={<App />} />,
      <Route key="register" path="/register" element={<Register />} />,
      <Route key="login" path="/login" element={<Login />} />,
      <Route key="ConnectingDB" path="/ConnectingDB" element={<ConnectingDB />} />,
    </Routes>
  </>,
];
