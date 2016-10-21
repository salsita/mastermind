import { combineReducers } from 'redux';

import authReducer from './authReducer';
import confirmationModalReducer from './confirmationModalReducer';
import gameReducer from './gameReducer';
import entityRepositoryReducer from './entityRepositoryReducer';

export default combineReducers({
  auth: authReducer,
  confirmationModal: confirmationModalReducer,
  game: gameReducer,
  entityRepository: entityRepositoryReducer
});
