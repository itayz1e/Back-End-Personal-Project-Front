import { Link, useNavigate } from "react-router-dom";
import "../style/Login.scss";
import Logo from "../assets/svg/Logo";
import { useState } from "react";
import {
  isTokenValid,
  login,
  logout,
  setTokenWithExpiry,
} from "../Service/authService";
import { LoginRequest } from "../Service/interface";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const requestData: LoginRequest = {
      username,
      password,
    };
    try {
      const token = await login(requestData);
      setTokenWithExpiry(token, 86400000);

      if (!token){
        setErrorMessage("User not found Please try again.");
      }

      if (isTokenValid() && token) {
        const dbConnected = localStorage.getItem("dbConnected");
        if (dbConnected === "true") {
          navigate("/");
        } else {
          navigate("/ConnectingDB");
        }
      } else {
        logout();
        setErrorMessage("Session is invalid. Please log in again.");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setErrorMessage("An error occurred. Please try again.");
      } else {
        setErrorMessage("Username or Password are not valid.");
      }
    }
  };

  return (
    <div className="align">
      <div className="grid align__item">
        <div className="login">
          <Logo />
          <h2>Sign in</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__field">
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form__field">
              <input
                type="password"
                id="password"
                placeholder="••••••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form__field">
              <input type="submit" value="Sign in" />
            </div>
            {errorMessage && <h3 className="error">{errorMessage}</h3>}
          </form>
          <p>
            Not registered yet? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
