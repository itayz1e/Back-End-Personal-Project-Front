import { useState } from "react";
import Logo from "../assets/svg/Logo";
import "../style/Register.scss";

import { register } from "../Service/authService";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [usernameDB, setUsernameDB] = useState<string>("");
  const [passwordDB, setPasswordDB] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await register(username, email, password, url, usernameDB, passwordDB);
      navigate('/login')
    } catch (err: any) {
      setErrorMessage('Username or email already exists');
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
              <label htmlFor="url">Url-DB</label>
              <input
                type="url"
                id="url"
                placeholder="jdbc:postgresql://???.???.com:???/???"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="form__field">
              <label htmlFor="usernameDB">Username DB</label>
              <input
                type="usernameDB"
                id="usernameDB"
                placeholder="usernameDB"
                required
                value={usernameDB}
                onChange={(e) => setUsernameDB(e.target.value)}
              />
            </div>
            <div className="form__field">
              <label htmlFor="passwordDB">Password DB</label>
              <input
                type="passwordDB"
                id="passwordDB"
                placeholder="••••••••••••"
                required
                value={passwordDB}
                onChange={(e) => setPasswordDB(e.target.value)}
              />
            </div>
            <div className="form__field">
              <input className="button" type="submit" value="Register" />
            </div>
          </form>
          {errorMessage && <h3 className="error">{errorMessage}</h3>}
          <p>
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
