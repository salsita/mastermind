import { connect } from 'react-redux';

import * as ActionTypes from '../constants/actionTypes';
import LoginView from '../components/LoginView';
import buildActionCreators from '../helpers/buildActionCreators';

const EMPTY_PROPS = {};

const mapStateToProps = () => EMPTY_PROPS;

export default connect(
  mapStateToProps,
  buildActionCreators({
    onLogin: ActionTypes.LOGIN
  })
)(LoginView);
