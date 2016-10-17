import React from 'react';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Link from 'react-router/Link';

import MainMenuView from '../components/MainMenuView';
import UserProfile from './UserProfile';
import LoadingSpinner from './LoadingSpinner';

export default () => (
  <Router>
    <div>
      <h1><Link to="/">Mastermind</Link></h1>
      <LoadingSpinner />
      <UserProfile />
      <div className="GameContainer">
        <Match exactly pattern="/" component={MainMenuView} />
      </div>
    </div>
  </Router>
);
