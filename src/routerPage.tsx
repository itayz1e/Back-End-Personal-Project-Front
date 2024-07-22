import { Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConnectingDB from "./pages/ConnectingDB";
import ProtectedRoute from "./components/ProtectedRoute";

export const RouterConfig = () => (
  <Routes>
    <Route key="home" path="/" element={<ProtectedRoute element={<App />} />} />
    <Route key="register" path="/register" element={<Register />} />
    <Route key="login" path="/login" element={<Login />} />
    <Route key="ConnectingDB" path="/ConnectingDB" element={<ConnectingDB />} />
  </Routes>
);
