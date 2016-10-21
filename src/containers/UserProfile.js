import { connect } from 'react-redux';

import UserProfile from '../components/UserProfile';
import buildActionCreators from '../helpers/buildActionCreators';
import * as ActionTypes from '../constants/actionTypes';
import * as AuthSelectors from '../selectors/authSelectors';

const USER_NOT_LOGGED_IN_PROPS = { loggedIn: false };

const mapStateToProps = (appState) => {
  if (AuthSelectors.isUserLoggedIn(appState)) {
    const {
      email,
      photo
    } = AuthSelectors.getLoggedUser(appState);

    return {
      email,
      photo,
      loggedIn: true
    };
  } else {
    return USER_NOT_LOGGED_IN_PROPS;
  }
};

export default connect(
  mapStateToProps,
  buildActionCreators({
    onLogin: ActionTypes.LOGIN,
    onLogout: ActionTypes.LOGOUT
  })
)(UserProfile);
