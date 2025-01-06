// src/components/Landing.jsx
import { Link } from "react-router-dom";
import './Landing.css';

const Landing = () => {
  return (
    <main>
      <div className="landing-content">
        <article className="landing-auth">
          <div className="landing-title">
            <h1>RECiT</h1>
          </div>
          <h2>Join Today</h2>
          <h3>
            Post your favorite recommendations for restaurants, books, movies,
            etc. and connect with other users!
          </h3>
          <ul>
            <div className="landing-auth-links">
              <Link to="/signup">
                <div className="landing-button">Create account</div>
              </Link>
              <Link to="/signin">
                <div className="landing-button">Sign In</div>
              </Link>
            </div>
          </ul>
        </article>
      </div>
    </main>
  );
};

export default Landing;
