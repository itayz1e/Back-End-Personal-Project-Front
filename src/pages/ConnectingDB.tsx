import { useState } from "react";
import Logo from "../assets/svg/Logo";
import "../style/ConnectingDB.scss";
import { useNavigate } from "react-router-dom";
import { connectToDatabase } from "../Service/authService";

const ConnectingDB = () => {
  const [username, setUsername] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const success = await connectToDatabase(
      url,
      username,
      password,
      setResult,
      setError,
      setLoading
    );

    if (success) {
      navigate("/");
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
          {error && <h3 className="error">{error}</h3>}
        </div>
      </div>
    </div>
  );
};

export default ConnectingDB;
