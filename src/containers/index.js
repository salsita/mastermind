import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserProfile from './UserProfile';
import ConfirmationModal from './ConfirmationModal';
import GameView from './GameView';
import MainMenuView from '../components/MainMenuView';

import * as AuthSelectors from '../selectors/authSelectors';

const Index = ({ loggedIn }) => (
  <Router>
    <div>
      <h1><Link to="/">Mastermind</Link></h1>
      <ConfirmationModal />
      <UserProfile />
      {loggedIn && (
        <div className="GameContainer">
          <UserProfile />
          <Route exact path="/" component={MainMenuView} />
          <Route exact path="/game" component={GameView} />
        </div>
      )}
    </div>
  </Router>
);

Index.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = appState => ({
  loggedIn: AuthSelectors.isUserLoggedIn(appState)
});

export default connect(mapStateToProps)(Index);
