import { combineReducers } from 'redux';

import authReducer from './authReducer';
import entityRepositoryReducer from './entityRepositoryReducer';
import onlineUsersReducer from './onlineUsersReducer';
import loadingSpinnerReducer from './loadingSpinnerReducer';

export default combineReducers({
  auth: authReducer,
  entityRepository: entityRepositoryReducer,
  onlineUsers: onlineUsersReducer,
  loadingSpinner: loadingSpinnerReducer
});
