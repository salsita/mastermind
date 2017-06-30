import React, { PropTypes } from 'react';
import './OnlineUsers.css';

const OnlineUsers = ({ users }) => (
  <div className="OnlineUsers">
    <h2>Players online: {users.length}</h2>
    <ul>
      {users.map((
        { id, email, photo }) => (
          <li key={id} title={email}>
            <img src={photo} alt={email} width={40} />
          </li>
        )
      )}
    </ul>
  </div>
);

OnlineUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })).isRequired
};

export default OnlineUsers;
