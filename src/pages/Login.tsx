import { Link } from "react-router-dom";
import "../style/Login.scss";
import Logo from "../assets/svg/Logo";
import { useState } from "react";
import { login } from "../Service/authService";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(username, password);
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
                type="username"
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
