import React, { useState } from "react";
import axios from "axios";
import Logo from "../assets/svg/Logo";
import "../style/ConnectingDB.scss";

const ConnectingDB = () => {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No token found');
      }
      
      const response = await axios.post(
        "http://localhost:8080/api/connect-db",
        {
          url,
          username,
          password
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
      );
  
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error connecting to database:", error);
      setMessage("Failed to connect to the database.");
    } finally {
      setLoading(false);
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
                placeholder="jdbc:postgresql://localhost:5432/postgres"
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
              <input type="submit" value="Connect" disabled={loading} />
            </div>
            {message && <div className="form__message">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConnectingDB;
