import { combineReducers } from 'redux';

import authReducer from './authReducer';
import entityRepositoryReducer from './entityRepositoryReducer';

export default combineReducers({
  auth: authReducer,
  entityRepository: entityRepositoryReducer
});
