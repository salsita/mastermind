import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Redirect from 'react-router/Redirect';
import Miss from 'react-router/Miss';
import Link from 'react-router/Link';

import UserProfile from './UserProfile';
import LoadingSpinner from './LoadingSpinner';
import LoginView from './LoginView';
import MainMenuView from '../components/MainMenuView';
import NotFoundView from '../components/NotFoundView';

import * as AuthSelectors from '../selectors/authSelectors';
import * as LoadingSpinnerSelectors from '../selectors/loadingSpinnerSelectors';

const redirect = pathname => () => <Redirect to={{ pathname }} />;

const LoginRedirect = redirect('/login');
const IndexRedirect = redirect('/');

const Index = ({ loggedIn, loading }) => (
  <Router>
    <div>
      <h1><Link to="/">Mastermind</Link></h1>
      <LoadingSpinner />
      <UserProfile />
      {!loggedIn && !loading && (
        <div>
          <Match exactly pattern="/login" component={LoginView} />
          <Miss component={LoginRedirect} />
        </div>
      )}
      {loggedIn && (
        <div className="GameContainer">
          <UserProfile />
          <Match exactly pattern="/" component={MainMenuView} />
          <Match exactly pattern="/login" component={IndexRedirect} />
          <Miss component={NotFoundView} />
        </div>
      )}
    </div>
  </Router>
);

Index.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = appState => ({
  loggedIn: AuthSelectors.isUserLoggedIn(appState),
  loading: LoadingSpinnerSelectors.isLoading(appState)
});

export default connect(mapStateToProps)(Index);
