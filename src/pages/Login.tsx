import { Link } from "react-router-dom";
import "../style/Login.scss";
import Logo from "../assets/svg/Logo";

const Login = () => {
  return (
    <div className="align">
      <div className="grid align__item">
        <div className="login">
          <Logo />
          <h2>Sign in</h2>
          <form className="form">
            <div className="form__field">
              <input
                type="username"
                id="username"
                placeholder="Username"
                required
              />
            </div>
            <div className="form__field">
              <input
                type="password"
                id="password"
                placeholder="••••••••••••"
                required
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
