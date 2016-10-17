import { combineReducers } from 'redux';

import authReducer from './authReducer';
import entityRepositoryReducer from './entityRepositoryReducer';
import loadingSpinnerReducer from './loadingSpinnerReducer';

export default combineReducers({
  auth: authReducer,
  entityRepository: entityRepositoryReducer,
  loadingSpinner: loadingSpinnerReducer
});
