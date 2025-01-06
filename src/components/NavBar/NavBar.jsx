import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = ({ user, handleSignout }) => {
  return (
    <>

      {user ? (
        <nav className="navbar">
          <ul className="nav-list">
            <div className="nav-content">
            <li className="nav-item"><Link to="/" className="recit-logo">RECiT</Link></li>
              <li className="nav-item"><Link to="/">Home</Link></li>
              <li className="nav-item"><Link to="/recommendations">Recommendations</Link></li>
              <li className="nav-item"><Link to="/user/recommendations">My Recommendations</Link></li>
              <li className="nav-item"><Link to="/recommendations/new">New Recommendation</Link></li>
              <li className="nav-item"><Link to="/recommendations/favorites">Favorites</Link></li>
            </div>
            <div className="nav-auth">
            <li className="nav-item"><Link to="" onClick={handleSignout}>Sign Out</Link></li>
            </div>
          </ul>
        </nav>
      ) : (
        <nav className="navbar">
          <ul className="nav-list">
            <div className="nav-content">
            <li className="nav-item"><Link to="/" className="recit-logo">RECiT</Link></li>
            </div>
            <div className="nav-landing">
            <div className="nav-auth">
            <li className="nav-item"><Link to="/signup">Sign Up</Link></li>
            <li className="nav-item"><Link to="/signin">Sign In</Link></li>
            </div>
            </div>
          </ul>
        </nav>
      )}
    </>
  );
};


export default NavBar;
