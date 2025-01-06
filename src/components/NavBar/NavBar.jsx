import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = ({ user, handleSignout }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-container">
        <li className="nav-item">
          <Link to="/" className="recit-logo">RECiT</Link>
        </li>

        {user ? (
          <>
            <li className="nav-item"><Link to="/recommendations">Recommendations</Link></li>
            <li className="nav-item"><Link to="/user/recommendations">My Recommendations</Link></li>
            <li className="nav-item"><Link to="/recommendations/new">New Recommendation</Link></li>
            <li className="nav-item"><Link to="/user/favorites">Favorites</Link></li>
            <li className="nav-item">
            <Link to="" onClick={handleSignout}>Sign Out</Link>
          </li>
          </>
        ): (
          <>
            <li className="nav-item"><Link to="/signup">Sign Up</Link></li>
            <li className="nav-item"><Link to="/signin">Sign In</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
