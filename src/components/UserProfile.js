import React from 'react';
import PropTypes from 'prop-types';
import './UserProfile.css';

const UserProfile = ({ loggedIn, email, photo, onLogin, onLogout }) => {
  if (loggedIn) {
    return (
      <div className="UserProfile">
        <img src={photo} alt={email} title={email} width={40} />
        <ul>
          <li onClick={onLogout}>Log Out</li>
        </ul>
      </div>
    );
  } else {
    return <button onClick={onLogin} className="loginButton">Log In</button>;
  }
};

UserProfile.propTypes = {
  email: PropTypes.string,
  photo: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default UserProfile;
