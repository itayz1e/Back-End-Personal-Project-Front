import { useState } from "react";
import Logo from "../assets/svg/Logo";
import "../style/ConnectingDB.scss";
import { getToken } from "../Service/authService";
import { useNavigate } from "react-router-dom";
import { serverApi } from "../Service/api";

const ConnectingDB = () => {
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      const token = getToken();
      const response = await serverApi.post(
        "http://localhost:8080/connect-db",
        {
          url: url,
          username: username,
          password: password,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );
        setLoading(false);
      // navigate("/");
      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  };

  return (
    <div className="align">
      <div className="grid align__item">
        <div className="connectingDB">
          <Logo />
          <h2>Connecting to a database</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__field">
              <input
                type="text"
                id="url"
                placeholder="Url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div className="form__field">
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form__field">
              <input
                type="password"
                id="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form__field">
              <input
                type="submit"
                value={loading ? "Connecting..." : "Connect"}
                disabled={loading}
                className={loading ? "loading" : ""}
              />
            </div>
          </form>
          {result && <h3 className="message">{result}</h3>}
        </div>
      </div>
    </div>
  );
};

export default ConnectingDB;
