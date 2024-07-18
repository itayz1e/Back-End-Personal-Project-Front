import Logo from "../assets/svg/Logo";
import "../style/ConnectingDB.scss"


const ConnectingDB = () => {
  return (
    <div className="align">
      <div className="grid align__item">
        <div className="connectingDB">
          <Logo />
          <h2>Connecting to a database</h2>
          <form className="form">
            <div className="form__field">
              <input
                type="text"
                id="url"
                placeholder="jdbc:postgresql://localhost:5432/postgres"
                required
              />
            </div>
            <div className="form__field">
              <input
                type="text"
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
              <input type="submit" value="Connection" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConnectingDB;
