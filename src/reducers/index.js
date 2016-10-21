import { combineReducers } from 'redux';

import authReducer from './authReducer';
import confirmationModalReducer from './confirmationModalReducer';

export default combineReducers({
  auth: authReducer,
  confirmationModal: confirmationModalReducer
});
