import React, { PropTypes } from 'react';

const LoginView = ({ onLogin }) => <button onClick={onLogin} className="loginButton">Log In</button>;

LoginView.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default LoginView;
