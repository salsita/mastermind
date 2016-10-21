import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';
import Link from 'react-router/Link';

import UserProfile from './UserProfile';
import ConfirmationModal from './ConfirmationModal';
import MainMenuView from '../components/MainMenuView';
import NotFoundView from '../components/NotFoundView';

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
          <Match exactly pattern="/" component={MainMenuView} />
          <Miss component={NotFoundView} />
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
