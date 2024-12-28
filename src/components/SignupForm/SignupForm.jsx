import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { name, username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(name && username && password && password === passwordConf);
  };

  return (
    <main>
      <div className="signup-content">
        <article className="signup-auth">
          <div className="signup-title">
            <h1>Sign Up</h1>
          </div>
          <p>{message}</p>
          <form onSubmit={handleSubmit}>
            <div className="signup-input">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="signup-input">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="signup-input">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="signup-input">
              <label htmlFor="confirm">Confirm Password:</label>
              <input
                type="password"
                id="confirm"
                value={passwordConf}
                name="passwordConf"
                onChange={handleChange}
              />
            </div>
            <div className="signup-buttons">
              <button className="signup-button" disabled={isFormInvalid()}>Sign Up</button>
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

export default SignupForm;
