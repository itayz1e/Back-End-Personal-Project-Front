import { useState } from "react";
import Logo from "../assets/svg/Logo";
import "../style/Register.scss";

import { register } from "../Service/authService";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await register(email, username, password);
      alert('Registration successful');
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setErrorMessage('Username or email already exists');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };


  return (
    <div className="align">
      <div className="grid align__item">
        <div className="register">
          <Logo />
          <h2>Register</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__field">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form__field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="info@mailaddress.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form__field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form__field">
              <input className="button" type="submit" value="Register" />
            </div>
          </form>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <p>
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
