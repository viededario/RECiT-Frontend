import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import './SigninForm.css';

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);

      props.setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main>
      <div className="signin-content">
        <article className="signin-auth">
          <div className="signin-title">
            <h1>Log In</h1>
          </div>
          <p>{message}</p>
          <form onSubmit={handleSubmit}>
            <div className="signin-input">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                autoComplete="off"
                id="username"
                value={formData.username}
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="signin-input">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                autoComplete="off"
                id="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="signin-buttons">
              <button className="signin-button">Log In</button>
              <Link to="/">
                <button className="cancel-button" type="button">Cancel</button>
              </Link>
            </div>
          </form>
        </article>
      </div>
    </main>
  );
};

export default SigninForm;
