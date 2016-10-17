import { combineReducers } from 'redux';

import authReducer from './authReducer';
import confirmationModalReducer from './confirmationModalReducer';
import entityRepositoryReducer from './entityRepositoryReducer';
import onlineUsersReducer from './onlineUsersReducer';
import loadingSpinnerReducer from './loadingSpinnerReducer';

export default combineReducers({
  auth: authReducer,
  confirmationModal: confirmationModalReducer,
  entityRepository: entityRepositoryReducer,
  onlineUsers: onlineUsersReducer,
  loadingSpinner: loadingSpinnerReducer
});
