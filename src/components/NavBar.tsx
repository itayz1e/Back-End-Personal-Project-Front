import { Link } from 'react-router-dom';
import '../style/NavBar.scss';

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/ConnectingDB">ConnectingDB</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
