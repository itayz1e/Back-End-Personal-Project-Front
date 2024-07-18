import Logo from "../assets/svg/Logo";
import "../style/Register.scss";

const Register = () => {
  return (
      <div className="align">
        <div className="grid align__item">
          <div className="register">
            <Logo />
            <h2>Register</h2>
            <form className="form">
              <div className="form__field">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Your username"
                  required
                />
              </div>
              <div className="form__field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="info@mailaddress.com"
                  required
                />
              </div>
              <div className="form__field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••••••"
                  required
                />
              </div>
              <div className="form__field">
                <input type="submit" value="Register" />
              </div>
            </form>
            <p>
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>
        </div>
      </div>
  );
};

export default Register;
