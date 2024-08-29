import { Link } from "react-router-dom";
import "../style/NavBar.scss";
import { logout } from "../Service/authService";

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/ConnectingDB">ConnectingDB</Link>
        </li>
        <li>
          <Link onClick={logout} to="/login">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
