import React from 'react';
import Link from 'react-router/Link';

import './MainMenuView.css';

const MainMenuView = () => (
  <div className="MainMenuView">
    <ul>
      <li><Link to="/game">Start Game</Link></li>
      <li><Link to="/leaderboard">Online Leaderboard</Link></li>
    </ul>
  </div>
);

export default MainMenuView;
