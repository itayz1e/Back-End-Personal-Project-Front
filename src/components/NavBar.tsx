import { Link } from 'react-router-dom';
import '../style/NavBar.scss';

import { logout, isAuthenticated } from '../Service/authService';

function NavBar() {
  //  const setLoggedIn = isAuthenticated();

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
          {/* {setLoggedIn ? ( */}
            <Link onClick={logout} to="/login">Logout</Link>
          {/* ) : ( */}
            {/* <Link to="/login">Login</Link> */}
          {/* )} */}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
