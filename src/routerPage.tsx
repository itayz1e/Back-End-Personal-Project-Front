import { Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/Login";
import Register from "./pages/Register";




export const router = ([
<Routes>
  <Route key="home" path={"/"} element={<App />}/>,
  {/* <Route key="about" path="/about" element={<About />}/>, */}
  <Route key="register" path="/register" element={<Register />}/>,
  <Route key="login" path="/login" element={<Login />}/>,
</Routes>
]);